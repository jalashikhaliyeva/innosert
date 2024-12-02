import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import prisma from "./prisma";

// This can be used inside a Server or Client component
// export async function loginIsRequiredServer() {
//   const session = await getServerSession(authConfig);
// }
