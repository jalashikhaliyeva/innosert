// components/AuthGate.js

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Spinner from "@/components/Spinner";

function AuthGate({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    const publicRoutes = [
      "/",
      "/haqqimizda",
      // Add other public routes here
      "/exams/",
      "/imtahanlar/",
      "/emekdasliq",
      "/etrafli/",
    ];
    const isPublicRoute =
      publicRoutes.includes(router.pathname) ||
      publicRoutes.some((route) => router.pathname.startsWith(route));

    if (!isPublicRoute) {
      if (session) {
        setIsAuthChecked(true);
      } else {
        router.replace("/");
      }
    } else {
      setIsAuthChecked(true);
    }
  }, [router.pathname, status, session]);

  if (status === "loading" || !isAuthChecked) {
    return <Spinner />;
  }

  return children;
}

export default AuthGate;
