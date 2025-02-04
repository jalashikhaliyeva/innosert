// components/AuthHandler.jsx

import { useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { UserContext } from "@/shared/context/UserContext";

function AuthHandler({ children }) {
  const { data: session, status } = useSession();
  const { login, fetchUserData } = useContext(UserContext);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (status === "loading") return;

    const socialProviders = ["google", "linkedin", "facebook"];
    let initiatedProvider = null;

    socialProviders.forEach((provider) => {
      if (typeof window !== "undefined" && localStorage.getItem(`${provider}SignIn`) === "true") {
        initiatedProvider = provider;
      }
    });

    if (status === "authenticated" && initiatedProvider) {
      // This means user used social login
      const sendUserData = async () => {
        try {
          const response = await fetch("https://api.innosert.az/api/social-register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: session?.user.id ? `Bearer ${session.user.id}` : undefined,
            },
            body: JSON.stringify(session.user),
          });

          const data = await response.json();
          if (response.ok && data?.data?.token) {
            const backendToken = data.data.token;

            // 1) Store the token in your UserContext (but no OTP for social!)
            await login(backendToken);

            // 2) Optionally fetch user data if needed
            //    But even if user.sv=0, skip OTP & go home
            //    If you prefer to check user data, you can do so:
            // const userData = await fetchUserData(backendToken);

            // 3) Just go home (since no OTP for social)
            router.push("/home");
          } else {
            console.error("Failed to get token from backend API:", data);
            toast.error(t("toastMessages.loginFailed"));
          }
        } catch (error) {
          console.error("Error in sendUserData:", error);
          toast.warning(t("toastMessages.generalError"));
        } finally {
          // Clean up localStorage
          if (typeof window !== "undefined") {
            localStorage.removeItem(`${initiatedProvider}SignIn`);
          }
        }
      };
      sendUserData();
    }
  }, [status, session, login, fetchUserData, router, t]);

  return children;
}

export default AuthHandler;
