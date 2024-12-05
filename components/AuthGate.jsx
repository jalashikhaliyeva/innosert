// components/AuthGate.js

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Spinner from "@/components/Spinner";

function AuthGate({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load

    const publicRoutes = [
      "/",
      "/haqqimizda",
      // Add other public routes here
      "/exams",
      "/imtahanlar",
      "/emekdasliq",
      "/etrafli",
    ];

    const isPublicRoute = publicRoutes.some((route) =>
      router.pathname.startsWith(route)
    );

    if (!isPublicRoute && status === "unauthenticated") {
      router.replace("/");
    }
  }, [router, status]);

  if (status === "loading") {
    return <Spinner />;
  }

  return children;
}

export default AuthGate;
