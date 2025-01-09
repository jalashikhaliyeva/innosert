import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import Spinner from "@/components/Spinner";
import AOS from "aos";
import "aos/dist/aos.css";
import i18n from "../locales/i18n";
import { UserProvider } from "@/shared/context/UserContext";
import { SavedExamsProvider } from "@/shared/context/SavedExamsContext";
import { SnackbarProvider } from "notistack";
import { ViewCountProvider } from "@/shared/context/ViewCountContext";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import CompanyContext from "../shared/context/CompanyContext";
import AuthHandler from "@/components/AuthHandler";
import AuthGate from "@/components/AuthGate";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "@/components/ErrorBoundary";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1300, once: true });
    AOS.refresh();

    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  useEffect(() => {
    const storedCompany = localStorage.getItem("selectedCompany");
    if (storedCompany) {
      setSelectedCompany(JSON.parse(storedCompany));
    }
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      localStorage.setItem("selectedCompany", JSON.stringify(selectedCompany));
    } else {
      localStorage.removeItem("selectedCompany");
    }
  }, [selectedCompany]);

  useEffect(() => {
    const { locale } = router;
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [router.locale]);

  // Remove or comment out the old console log "Retrieved token: null"

  return (
    <SessionProvider session={pageProps.session}>
      <UserProvider>
        <AuthHandler>
          <SnackbarProvider
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={1500}
            maxSnack={3}
          >
            <SavedExamsProvider>
              <ViewCountProvider>
                <CompanyContext.Provider
                  value={{ selectedCompany, setSelectedCompany }}
                >
                  <AuthGate>
                    <ErrorBoundary>
                      {loading ? <Spinner /> : <Component {...pageProps} />}
                    </ErrorBoundary>
                    <ToastContainer
                      position="top-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                    />
                  </AuthGate>
                </CompanyContext.Provider>
              </ViewCountProvider>
            </SavedExamsProvider>
          </SnackbarProvider>
        </AuthHandler>
      </UserProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);
