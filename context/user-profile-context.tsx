"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, FormEvent } from "react";
import { auth, storage } from "@/firebase-config";
import { getUserProfileData, submitUserProfileDatas } from "@/lib/actions/dashboard";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: string;
}

interface ErrorField {
  [key: string]: {
    status: boolean;
    message: string;
  };
}

interface UserProfileContextProps {
  userProfilePicMockup: string | null;
  userObject: UserProfile;
  errorObject: ErrorField;
  hasError: boolean;
  handleError: (error: ErrorField) => void;
  loading: boolean;
  handleUserProfilePicMockup: (imageURL: string) => void;
  handleFieldEdit: (value: boolean) => void;
  buttonDisabled: boolean;
  userProfilePicURL: string | null;
  handleUserProfilePic: (imageFile: File) => void;
  handleUserInputs: (name: string, value: string) => void;
  handleSubmit: (event: FormEvent) => Promise<void>;
}

const UserProfileContext = createContext<UserProfileContextProps | undefined>(undefined);

export const useUserProfileContext = (): UserProfileContextProps => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfileContext must be used within a UserProfileProvider");
  }
  return context;
};

interface UserProfileProviderProps {
  children: ReactNode;
}

const UserProfileProvider: React.FC<UserProfileProviderProps> = ({ children }) => {
  const [userObject, setUserObject] = useState<UserProfile>({
    first_name: "",
    last_name: "",
    email: "",
    profile_picture: "",
  });
  const [userProfilePicFile, setUserProfilePicFile] = useState<File | null>(null);
  const [userProfilePicURL, setUserProfilePicURL] = useState<string | null>(null);
  const [userProfilePicMockup, setUserProfilePicMockup] = useState<string | null>(null);
  const [hasAnyChanges, setHasAnyChanges] = useState<boolean>(false);
  const [errorObject, setErrorObject] = useState<ErrorField>({});
  const [hasError, setHasError] = useState<boolean>(false);
  const [imageProcessLoading, setImageProcessLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const handleUserProfilePicMockup = (imageURL: string) => {
    setUserProfilePicMockup(imageURL);
  };

  const handleUserProfilePic = (imageFile: File) => {
    setHasAnyChanges(true);
    setUserProfilePicFile(imageFile);
  };

  const postUserProfilePicFileIntoStorage = async (picFile: File) => {
    const currentUser = auth?.currentUser;
    if (!currentUser) {
      throw new Error("User not found");
    }

    setImageProcessLoading(true);
    const storageRef = ref(storage, `users/${currentUser.displayName}/profile_picture`);

    try {
      const uploadTask = uploadBytesResumable(storageRef, picFile);
      const snapshot = await uploadTask;
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Image cannot be uploaded!", error);
    } finally {
      setImageProcessLoading(false);
    }
  };

  const handleFieldEdit = (value: boolean) => {
    setHasAnyChanges(value);
  };

  const handleError = (error: ErrorField) => {
    setErrorObject(error);
  };

  const handleUserInputs = (name: string, value: string) => {
    setUserObject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (hasError) return;

    if (userObject.first_name.trim() === "") {
      setErrorObject((prev) => ({
        ...prev,
        first_name: { status: true, message: "Can't be empty" },
      }));
      return;
    } else if (userObject.last_name.trim() === "") {
      setErrorObject((prev) => ({
        ...prev,
        last_name: { status: true, message: "Can't be empty" },
      }));
      return;
    }

    setLoading(true);

    if (userProfilePicFile) {
      const picURL = await postUserProfilePicFileIntoStorage(userProfilePicFile);
      setUserProfilePicURL(picURL);
      setUserObject((prev) => ({ ...prev, profile_picture: picURL }));

      await submitUserProfileDatas({ ...userObject, profile_picture: picURL });
    } else {
      await submitUserProfileDatas(userObject);
    }

    setHasAnyChanges(false);
    setLoading(false);
  };

  useEffect(() => {
    const hasError = Object.values(errorObject).some((error) => error.status);
    setHasError(hasError);
  }, [errorObject]);

  useEffect(() => {
    setLoading(true);
    getUserProfileData()
      .then((userData) => {
        setUserObject(userData);
        setUserProfilePicURL(userData.profile_picture);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        throw new Error(error.message);
      });
  }, []);

  useEffect(() => {
    if (hasAnyChanges && !hasError && !loading && !imageProcessLoading) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [hasAnyChanges, hasError, errorObject, loading, imageProcessLoading]);

  const values = {
    userProfilePicMockup,
    userObject,
    errorObject,
    hasError,
    handleError,
    loading,
    handleUserProfilePicMockup,
    handleFieldEdit,
    buttonDisabled,
    userProfilePicURL,
    handleUserProfilePic,
    handleUserInputs,
    handleSubmit,
  };

  return (
    <UserProfileContext.Provider value={values}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileProvider;
