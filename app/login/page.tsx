// import { useLogin } from "../hooks/useAuth";
"use client"
import { useForm } from "react-hook-form";
import { useLogin } from "../shared/lib/useAuth";

interface LoginFormValues {
  phone: string;
  password: string;
}

function LoginForm() {
  const { mutate: login, isPending, isError, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <form className="mt-40" onSubmit={handleSubmit(onSubmit)}>

      {/* Global API error */}
      {isError && <span>{error?.message ?? "Login failed"}</span>}

      {/* Phone */}
      <div>
        <input
          placeholder="Phone"
          {...register("phone", {
            required: "Phone is required",
            pattern: {
              value: /^\+?[0-9]{9,13}$/,
              message: "Invalid phone number",
            },
          })}
        />
        {errors.phone && <span>{errors.phone.message}</span>}
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>

    </form>
  );
}

export default LoginForm