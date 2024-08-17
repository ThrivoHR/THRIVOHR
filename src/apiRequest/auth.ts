import http from "@/lib/https";
import {
  LoginBodyType,
  LoginResType,
} from "@/schemaValidation/auth.schema";


const authApiRequest = {
  login: (body: LoginBodyType) =>
    http.post<LoginResType>("/api/v1/authentication", body),
  auth: (body: { sessionToken: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),
};

export default authApiRequest;
