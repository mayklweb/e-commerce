"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { setToken } from "./model/store/auth";
import Link from "next/link";

// --- Yup schema for backend (raw phone) ---
export const loginSchema = yup.object().shape({
  name: yup.string().required("Ism majburiy"),

  phone: yup.string().required("Phone is required"), // UI formatted phone, faqat required bo‘lsa kifoya

  phoneRaw: yup
    .string()
    .matches(/^[0-9]{9}$/, "Phone must be 9 digits")
    .required("Phone is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  rememberMe: yup.boolean(),
});

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

export default function SignIn() {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      name: "",
      phone: "",
      phoneRaw: "",
      password: "",
      rememberMe: true,
    },
  });

  const rememberMe = watch("rememberMe");

  const onSubmit = (data: any) => {
    console.log("Frontend:", data.phoneRaw); // +998 99 899 83 32
    console.log("Backend:", data.phone); // 998998332
    localStorage.setItem("token", data.phone);
    dispatch(setToken(data.phone));
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-md mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Sign In</h1>
        <p className="text-gray-600">Login to your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* --- Phone --- */}
        <Controller
          name="phoneRaw"
          control={control}
          render={({ field }) => (
            <div>
              <input
                {...field}
                value={(field.value as string) || ""}
                type="text"
                placeholder="+998 __ ___ __ __"
                className="py-2 px-2.5 border-primary/10 focus-within:border-secondary border rounded-lg outline-none w-full "
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  field.onChange(formatted);

                  // Extract raw phone (9 digits only, without 998)
                  const allDigits = e.target.value.replace(/\D/g, "");
                  let Phone = allDigits;
                  if (allDigits.startsWith("998")) {
                    Phone = allDigits.slice(3, 12);
                  } else {
                    Phone = allDigits.slice(0, 9);
                  }

                  setValue("phone", Phone);
                }}
              />
              {errors.phone?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          )}
        />

        {/* --- Password --- */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div>
              <input
                {...field}
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
          )}
        />

        <button className="w-full mt-5 uppercase bg-primary text-white py-2 px-4 rounded-lg hover:text-primary hover:bg-secondary transition-all ease-in-out duration-300">
          KIRISH
        </button>
      </form>
      <div>
        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="w-full flex items-center gap-2 uppercase text-sm">
            <span className="h-px flex flex-auto bg-primary"></span>
            <p>Akkaunt yaratish</p>
            <span className="h-px flex flex-auto bg-primary"></span>
          </div>
          <Link href={'/signup'} className="w-full mt-5 text-center uppercase bg-primary/10 text-primary py-2 px-4 rounded-lg hover:bg-secondary transition-all ease-in-out duration-300">
            Yaratish
          </Link>
        </div>
      </div>
    </div>
  );
}
