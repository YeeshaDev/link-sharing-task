import { z } from "zod";

// Define the types for the schema
export type SignupFormValues = z.infer<typeof SignupFormSchema>;
export type SigninFormValues = z.infer<typeof SigninFormSchema>;
export type UserProfileValues = z.infer<typeof UserProfileSchema>;

export const SignupFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .trim(),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const SigninFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .trim(),
});

export const UserProfileSchema = z.object({
  profile_picture: z.string().optional(),
  first_name: z.string().min(2, { message: "First name is too short." }),
  last_name: z.string().min(2, { message: "Last name is too short." }),
  email: z.string().email({ message: "Please enter a valid email." }),
});
