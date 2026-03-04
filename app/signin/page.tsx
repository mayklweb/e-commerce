"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/slices/authSlice";
import { useForm } from "react-hook-form";
import { $api } from "../shared/api/api";
import { signinUrl } from "../utils/urls";
import { useState } from "react";
import { useRouter } from "next/navigation";

// --- Format phone for display (with +998 prefix and spaces) ---
const formatPhone = (value: string) => {
  // Extract only digits
  const allDigits = value.replace(/\D/g, "");

  // Remove country code (998) if present and take only next 9 digits
  let digits = allDigits;
  if (allDigits.startsWith("998")) {
    digits = allDigits.slice(3, 12); // Take 9 digits after 998
  } else {
    digits = allDigits.slice(0, 9); // Take first 9 digits
  }

  // If no digits, return empty string
  if (!digits) {
    return "";
  }

  // Format: +998 XX XXX XX XX
  const part1 = digits.slice(0, 2);
  const part2 = digits.slice(2, 5);
  const part3 = digits.slice(5, 7);
  const part4 = digits.slice(7, 9);

  let formatted = "+998";
  if (part1) formatted += ` ${part1}`;
  if (part2) formatted += ` ${part2}`;
  if (part3) formatted += ` ${part3}`;
  if (part4) formatted += ` ${part4}`;

  return formatted;
};

// --- Extract raw phone (9 digits only) for API submission ---
const extractRawPhone = (value: string) => {
  const allDigits = value.replace(/\D/g, "");

  if (allDigits.startsWith("998")) {
    return allDigits.slice(3, 12);
  } else {
    return allDigits.slice(0, 9);
  }
};

export default function SignIn() {
  const dispatch = useDispatch();
  const [displayPhone, setDisplayPhone] = useState("");

  const { register, handleSubmit, setValue, formState } = useForm({
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      const res = await $api.post(signinUrl, {
        phone: extractRawPhone(data.phone),
        password: data.password,
      });

      const { token, data: user } = res.data;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Save to Redux
      dispatch(
        setAuth({
          user,
          token,
        }),
      );

      router.replace("/profile");
    } catch (err: any) {
      if (err?.response?.status === 401) {
        alert("Telefon yoki parol noto‘g‘ri");
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-md mx-auto p-6">
      <div className="">
        <h1 className="text-2xl font-bold mb-2">Kirish</h1>
        <p className="text-gray-600">Hisob qaydnomasiga kirish</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6">
          <label>Telefon</label>
          <input
            type="text"
            placeholder="+998 __ ___ __ __"
            value={displayPhone}
            onChange={(e) => {
              const formatted = formatPhone(e.target.value);
              setDisplayPhone(formatted);

              // form state ga raw 9 digit beramiz
              setValue("phone", extractRawPhone(e.target.value));
            }}
            className="py-2 px-2.5 border-primary/10 focus-within:border-secondary border rounded-lg outline-none w-full"
          />
        </div>
        <div className="mt-5">
          <label>Parol</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="py-2 px-2.5 border-primary/10 focus-within:border-secondary border rounded-lg outline-none w-full"
          />
        </div>
        <input
          className="w-full mt-5 uppercase bg-primary text-white py-2 px-4 rounded-lg hover:text-primary hover:bg-secondary transition-all ease-in-out duration-300"
          type="submit"
          value="Kirish"
        />
     
      </form>

      <div>
        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="w-full flex items-center gap-3 uppercase text-xs font-semibold">
            <span className="h-px flex flex-auto bg-primary"></span>
            <p>Akkaunt yaratish</p>
            <span className="h-px flex flex-auto bg-primary"></span>
          </div>
          <Link
            href={"/signup"}
            className="w-full mt-5 text-center uppercase bg-primary/10 text-primary py-2 px-4 rounded-lg hover:bg-secondary transition-all ease-in-out duration-300"
          >
            Yaratish
          </Link>
        </div>
      </div>
    </div>
  );
}
