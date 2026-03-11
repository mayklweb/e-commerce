"use client"
import { useForm } from "react-hook-form";
import { useSignup } from "../shared/lib/useAuth";

interface SignupFormValues {
  name: string;
  phone: string;
  password: string;
}

function SignupForm() {
  const { mutate: signup, isPending } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const onSubmit = (data: SignupFormValues) => {
    signup(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name */}
      <div>
        <input
          placeholder="Name"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Minimum 2 characters" },
          })}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

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
        {isPending ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}

export default SignupForm