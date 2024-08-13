import { EntityError, HttpError } from "@/lib/https";
import { type ClassValue, clsx } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import jwt from 'jsonwebtoken'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleErrorApi = ({
  error,
  setError,
}: {
  error: any;
  setError?: UseFormSetError<any>;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: "server",
        message: item.message,
      });
    });
  } else if (error instanceof HttpError && setError) {
    const { status, payload } = error;
    if (status === 400 && payload.detail) {
      setError("password", {
        type: "server",
        message: payload.detail,
      });
    } else if (status === 404) {
      setError("employeeCode", {
        type: "server",
        message: payload.detail,
      });
    } else {
      console.error("Unexpected error:", payload.message);
    }
  } else {
    console.error("Unexpected error:", error);
  }
};

export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const decodeJWT = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload;
};