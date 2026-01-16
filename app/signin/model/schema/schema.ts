import * as yup from "yup";

// export const loginSchema = yup.object().shape({
//   phone: yup
//     .string()
//     .matches(/^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/, "Invalid phone format")
//     .required("Phone is required"),
//   password: yup
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
//   rememberMe: yup.boolean(),
// });

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