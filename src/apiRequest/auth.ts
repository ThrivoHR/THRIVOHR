import http from "@/lib/https";
import {
  LoginBodyType,
  LoginResType,
} from "@/schemaValidation/auth.schema";
import { MessageResType } from "@/schemaValidation/common.schema";


const authApiRequest = {
  login: (body: LoginBodyType) =>
    http.post<LoginResType>("/api/v1/authentication", body),
  auth: (body: { sessionToken: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),
    logoutFromNextClientToNextServer: (
      force?: boolean | undefined,
      signal?: AbortSignal | undefined
    ) =>
      http.post<MessageResType>(
        "/api/auth/logout",
        {
          force,
        },
        {
          baseUrl: "",
          signal,
        }
      ),
};

export default authApiRequest;
