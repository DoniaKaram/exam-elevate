import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/api.constant";
import { cookies } from "next/headers";
import AppError from "./lib/utils/app-error";
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "auth/login",
    error: "auth/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch("https://exam.elevateegy.com/api/v1/auth/signin", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            ...JSON_HEADER,
          },
        });

        const payload: APIResponse<LoginResponse> = await response.json();

        // If login was successful, return the user data alongside the token
        if (!("code" in payload)) {
          // Save the token in cookies separately
          cookies().set("accessToken", payload.token, {
            httpOnly: true,
          });

          // Return user data alongside the token
          return {
            id:payload.user._id,
            accessToken: payload.token,
            ...payload.user,
          };
        }

        // Otherwise, throw the error returned from the backend
        throw new AppError(payload.message, payload.code);
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token._id = user._id;
        token.username = user.username;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
        token.phone = user.phone;
        token.isVerified = user.isVerified;
        token.accessToken=user.accessToken;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.username = token.username;
      session.email = token.email;
      session.firstName = token.firstName;
      session.lastName = token.lastName;
      session._id = token._id;
      session.role = token.role;
      session.phone = token.phone;
      session.isVerified = token.isVerified;
   

      return session;
    },
  },
};