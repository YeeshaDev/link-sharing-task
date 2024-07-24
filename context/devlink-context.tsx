"use client";

import { getUserDevlinks, submitUserDevLinks } from "@/lib/actions/dashboard";
import { generateId } from "@/lib/utils/helpers";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface DevLink {
  id: string;
  platform: string;
  link: string;
}

interface ErrorField {
  id: string;
  status: boolean;
  field: {
    link?: { error: boolean; message: string };
    platform?: { error: boolean; message: string };
  };
}

interface DevlinksContextType {
  devlinksList: DevLink[];
  loading: boolean;
  isListEdited: boolean;
  isButtonDisabled: boolean;
  errorState: ErrorField[];
  addNewLink: () => void;
  removeLink: (id: string) => void;
  throwError: (id: string, status: boolean, errorObj: ErrorField['field']) => void;
  removeError: (id: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  addItemIntoList: (fieldId: string, platform: string, link: string) => void;
  changeIsEditedValue: (value: boolean) => void;
  reorderList: (newOrderedList: DevLink[]) => void;
}

// Define the type for the context
const DevlinksContext = createContext<DevlinksContextType | undefined>(undefined);

export const useDevlinksContext = () => {
  const context = useContext(DevlinksContext);
  if (context === undefined) {
    throw new Error(
      "useDevlinksContext must be used within a DevlinksProvider"
    );
  }
  return context;
};

interface DevlinksProviderProps {
  children: ReactNode;
}

export const DevlinksProvider: React.FC<DevlinksProviderProps> = ({ children }) => {
  const [devlinksList, setDevlinksList] = useState<DevLink[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorField, setErrorField] = useState<ErrorField[]>([]);
  const [isListEdited, setIsListEdited] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const throwError = (id: string, status: boolean, errorObj: ErrorField['field']) => {
    const existingError = errorField.find((item) => item.id === id);

    if (existingError) {
      setErrorField((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status, field: errorObj } : item
        )
      );
    } else {
      setErrorField((prev) => [...prev, { id, status, field: errorObj }]);
    }
  };

  const removeError = (id: string) => {
    setErrorField((prev) => prev.filter((item) => item.id !== id));
  };

  const changeIsEditedValue = (value: boolean) => {
    setIsListEdited(value);
  };

  const addNewLink = () => {
    setIsListEdited(true);
    const id = generateId();
    setDevlinksList((prev) =>
      prev ? [...prev, { id, platform: "", link: "" }] : [{ id, platform: "", link: "" }]
    );
  };

  const removeLink = (id: string) => {
    setIsListEdited(true);
    removeError(id);

    if (devlinksList.length === 1) {
      setIsListEdited(false);
    }

    setDevlinksList((prev) => prev.filter((link) => link.id !== id));
  };

  const addItemIntoList = (fieldId: string, platform: string, link: string) => {
    const existingLink = devlinksList.find((item) => item.id === fieldId);
    if (existingLink) {
      setDevlinksList((prev) =>
        prev.map((item) =>
          item.id === fieldId
            ? {
                ...item,
                platform,
                link,
              }
            : item
        )
      );
    } else {
      setDevlinksList((prev) => [
        ...prev,
        {
          id: fieldId,
          platform,
          link,
        },
      ]);
    }
  };

  const reorderList = (newOrderedList: DevLink[]) => {
    setIsListEdited(true);
    setDevlinksList(newOrderedList);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    for (const link of devlinksList) {
      if (link.link.trim() === "") {
        throwError(link.id, true, {
          link: {
            error: true,
            message: "Can't be empty",
          },
        });
        return;
      } else if (link.link && !linkRegex.test(link.link)) {
        throwError(link.id, true, {
          link: {
            error: true,
            message: "Invalid URL",
          },
        });
        return;
      } else if (link.platform.trim() === "") {
        throwError(link.id, true, {
          platform: {
            error: true,
            message: "Can't be empty",
          },
        });
        return;
      }
    }

    setIsListEdited(false);
    await submitUserDevLinks(devlinksList);
  };

  useEffect(() => {
    if (
      isListEdited &&
      devlinksList.length > 0 &&
      !loading &&
      errorField.length === 0
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [isListEdited, devlinksList, loading, errorField]);

  useEffect(() => {
    setLoading(true);
    getUserDevlinks()
      .then((devlinks) => {
        setLoading(false);

        if (!devlinks) return;
        setDevlinksList(devlinks);
      })
      .catch((error) => {
        setLoading(false);
        throw new Error(error);
      });
  }, []);

  const value: DevlinksContextType = {
    loading,
    devlinksList,
    isListEdited,
    isButtonDisabled,
    addNewLink,
    removeLink,
    errorState: errorField,
    throwError,
    removeError,
    handleSubmit,
    addItemIntoList,
    changeIsEditedValue,
    reorderList,
  };

  return (
    <DevlinksContext.Provider value={value}>
      {children}
    </DevlinksContext.Provider>
  );
};
