"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { loginSchema } from "../../model/schema/schema";
import { useState } from "react";
import { $api } from "@/app/shared/api/api";
import { signupUrl } from "@/app/utils/urls";
import { setAuth } from "@/app/store/slices/authSlice";

// --- Format phone for UI ---
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

export const Form = () => {
  const dispatch = useDispatch();
  const [phoneDisplay, setPhoneDisplay] = useState<string>("");

  const {
    handleSubmit,
    control,
    setValue,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    localStorage.setItem("token", data.phone);
    dispatch(
      setAuth({
        user: { name: data.name, phone: data.phone, password: data.password },
        token: data.token,
      }),
    );
  };

  const handleFinish = async (data: any) => {
    try {
      $api
        .post(signupUrl, data)
        .then((res) => {
          dispatch(
            setAuth({
              user: {
                name: data.name,
                phone: data.phone,
                password: data.password,
              },
              token: data.token,
            }),
          );
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            alert("Bunday user bor!!!");
          }
        });
    } catch (error) {}
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Sign Up</h1>
        <p className="text-gray-600">Login to your account</p>
      </div>

      <form onSubmit={handleSubmit(handleFinish)} className="space-y-4">
        {/* --- Name --- */}

        <div>
          <input
            {...register("name")}
            type="text"
            placeholder="Ismingiz"
            className="py-2 px-2.5 border-primary/10 focus-within:border-secondary border rounded-lg outline-none w-full "
          />
          {errors.name?.message && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* --- Phone --- */}

        <div>
          <input
            {...register("phone")}
            value={phoneDisplay}
            type="text"
            placeholder="+998 __ ___ __ __"
            className="py-2 px-2.5 border-primary/10 focus-within:border-secondary border rounded-lg outline-none w-full"
          />
          {errors.phone?.message && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* --- Password --- */}

        <div>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="py-2 px-2.5 border-primary/10 focus-within:border-secondary border rounded-lg outline-none w-full "
          />
          {errors.password?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-5 uppercase bg-primary text-white py-2 px-4 rounded-lg hover:text-primary hover:bg-secondary transition-all ease-in-out duration-300"
        >
          Yaratish
        </button>
      </form>
      <div>
        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="w-full flex items-center gap-3 uppercase text-xs font-semibold">
            <span className="h-px flex flex-auto bg-primary"></span>
            <p>Akkauntga kirish</p>
            <span className="h-px flex flex-auto bg-primary"></span>
          </div>
          <Link
            href={"/signin"}
            className="w-full mt-5 text-center uppercase bg-primary/10 text-primary py-2 px-4 rounded-lg hover:bg-secondary transition-all ease-in-out duration-300"
          >
            Kirish
          </Link>
        </div>
      </div>
    </div>
  );
};
