import { auth } from "@/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";

import { redirect } from "next/navigation";

import { SigninFormSchema, SignupFormSchema } from "../definitions";
import toast from "react-hot-toast";
import { ref, set } from "firebase/database";
import { database } from "@/firebase-config";
import { handleFirebaseAuthErrors } from "../utils/handle-firebase-errors";
import { generateId } from "../utils/helpers";

// Define the type for initial profile data
interface InitialProfileData {
  profile: {
    profile_picture: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export const writeInitialUserData = async (id: string): Promise<void> => {
  const initialProfileData: InitialProfileData = {
    profile: {
      profile_picture: "",
      first_name: "",
      last_name: "",
      email: "",
    },
  };

  try {
    await set(ref(database, `users/${id}`), initialProfileData);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

interface FormData {
  get(name: string): FormDataEntryValue | null;
}

// signup
export const signup = async (state: unknown, formData: FormData): Promise<{ errors?: Record<string, string[]> }> => {
  const id = generateId(6);

  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirm-password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  const { user } = await createUserWithEmailAndPassword(auth, email, password).catch((error) => {
    handleFirebaseAuthErrors(error);
    return { user: null };
  });

  if (user) {
    await updateProfile(user, {
      displayName: id,
    });

    await writeInitialUserData(id);

    toast.success("Account created successfully!");
    redirect("/customize-links");
  }
};

// signin
export const signin = async (state: unknown, formData: FormData): Promise<{ errors?: Record<string, string[]> } | void> => {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  const { user } = await signInWithEmailAndPassword(auth, email, password).catch((error) => {
    handleFirebaseAuthErrors(error);
    return;
  });

  if (user) {
    toast.success("Login successful!");
    redirect("/customize-links");
  } else {
    throw new Error("Failed to login");
  }
};

export function logout(): void {
  signOut(auth);
}
