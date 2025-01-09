import { useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { UserContext } from "@/shared/context/UserContext";

function AuthHandler({ children }) {
  const { data: session, status } = useSession();
  const { login } = useContext(UserContext);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (status === "loading") return;

    const socialProviders = ["google", "linkedin", "facebook"];
    let initiatedProvider = null;

    socialProviders.forEach((provider) => {
      if (localStorage.getItem(`${provider}SignIn`) === "true") {
        initiatedProvider = provider;
      }
    });

    if (status === "authenticated" && initiatedProvider) {
      const sendUserData = async () => {
        try {
          const response = await fetch(
            "https://innocert-admin.markup.az/api/social-register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: session?.user.id
                  ? `Bearer ${session.user.id}`
                  : undefined,
              },
              body: JSON.stringify(session.user),
            }
          );

          const data = await response.json();
          console.log(data, "auth handler");

          if (response.ok && data.data.token) {
            const backendToken = data.data.token;
            console.log(backendToken, "backendToken");
            
          
            // Wait for the token to be set before redirect
            await login(backendToken);
          
            router.push("/home");
          } else {
            console.error("Failed to get token from backend API:", data);
            toast.error(t("toastMessages.loginFailed"));
          }
        } catch (error) {
          console.error("Error in sendUserData:", error);
          toast.warning(t("toastMessages.generalError"));
        } finally {
          // Clean up
          localStorage.removeItem(`${initiatedProvider}SignIn`);
        }
      };
      sendUserData();
    }
  }, [status, session, login, router, t]);

  return children;
}

export default AuthHandler;
