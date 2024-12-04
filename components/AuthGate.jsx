// components/AuthGate.js

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Spinner from "@/components/Spinner";
import { UserContext } from "@/shared/context/UserContext";

function AuthGate({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { token, loading: userLoading } = useContext(UserContext);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (userLoading || status === "loading") return;

    const publicRoutes = ["/", "/haqqimizda"];
    const isPublicRoute = publicRoutes.includes(router.pathname) ||
      router.pathname.startsWith("/exams/") ||
      router.pathname.startsWith("/imtahanlar/") ||
      router.pathname.startsWith("/imtahanlar") ||
      router.pathname.startsWith("/emekdasliq") ||
      router.pathname.startsWith("/etrafli/");

    if (!isPublicRoute) {
      if (token || session) {
        setIsAuthChecked(true);
      } else {
        router.replace("/");
      }
    } else {
      setIsAuthChecked(true);
    }
  }, [router.pathname, status, userLoading, token, session]);

  if (userLoading || status === "loading" || !isAuthChecked) {
    return <Spinner />;
  }

  return children;
}

export default AuthGate;
