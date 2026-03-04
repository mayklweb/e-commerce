"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useState } from "react";
import { $api } from "@/app/shared/api/api";
import { signupUrl } from "@/app/utils/urls";
import { setAuth } from "@/app/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { signupSchema } from "../../model/schema/schema";

// Format phone for UI
const formatPhone = (value: string): string => {
  const allDigits = value.replace(/\D/g, "");

  let digits = allDigits;
  if (allDigits.startsWith("998")) {
    digits = allDigits.slice(3, 12);
  } else {
    digits = allDigits.slice(0, 9);
  }

  if (!digits) return "";

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

const extractRawPhone = (value: string): string => {
  const allDigits = value.replace(/\D/g, "");

  if (allDigits.startsWith("998")) {
    return allDigits.slice(3, 12);
  }
  return allDigits.slice(0, 9);
};

type FormData = {
  name: string;
  phone: string;
  phoneRaw: string;
  password: string;
};

export const Form = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [displayPhone, setDisplayPhone] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(signupSchema) as any,
    defaultValues: {
      name: "",
      phone: "",
      password: "",
    },
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatPhone(rawValue);
    setDisplayPhone(formatted);

    // Store raw phone value in form state
    const rawPhone = extractRawPhone(rawValue);
    setValue("phone", rawPhone, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);

    try {
      const res = await $api.post(signupUrl, {
        phone: data.phone, // Already raw format from setValue
        password: data.password,
        name: data.name,
      });

      const { token, data: user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch(
        setAuth({
          user,
          token,
        }),
      );

      router.replace("/");
    } catch (err: any) {
      if (err?.response?.status === 401) {
        alert("Telefon yoki parol noto‘g‘ri");
      } else {
        console.error("Signup error:", err);
        alert("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Ro'yhatdan o'tish</h1>
        <p className="text-gray-600">Hisob qaydnomasini yaratish</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, (errors) =>
          console.log("Validation failed:", errors),
        )}
      >
        <div>
          <label htmlFor="name" className="block mb-1">
            Ismingiz
          </label>
          <input
            id="name"
            {...register("name")}
            type="text"
            placeholder="Ismingiz"
            className="py-2 px-2.5 border-primary/10 focus-within:border-secondary border rounded-lg outline-none w-full"
          />
          {errors.name?.message && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block mb-1">
            Telefon
          </label>
          <input
            id="phone"
            type="text"
            placeholder="+998 __ ___ __ __"
            value={displayPhone}
            onChange={handlePhoneChange}
            className="py-2 px-2.5 border-primary/10 focus-within:border-secondary border rounded-lg outline-none w-full"
          />
          {errors.phone?.message && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block mb-1">
            Parol
          </label>
          <input
            id="password"
            {...register("password")}
            type="password"
            placeholder="Password"
            className="py-2 px-2.5 border-primary/10 focus-within:border-secondary border rounded-lg outline-none w-full"
          />
          {errors.password?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <input
          type="submit"
          value={"Yaratish"}
          disabled={isSubmitting}
          className="w-full mt-5 uppercase bg-primary text-white py-2 px-4 rounded-lg hover:text-primary hover:bg-secondary transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </form>

      <div className="mt-5 flex flex-col items-center justify-center">
        <div className="w-full flex items-center gap-3 uppercase text-xs font-semibold">
          <span className="h-px flex flex-auto bg-primary"></span>
          <p>Akkauntga kirish</p>
          <span className="h-px flex flex-auto bg-primary"></span>
        </div>
        <Link
          href="/signin"
          className="w-full mt-5 text-center uppercase bg-primary/10 text-primary py-2 px-4 rounded-lg hover:bg-secondary transition-all ease-in-out duration-300"
        >
          Kirish
        </Link>
      </div>
    </div>
  );
};
