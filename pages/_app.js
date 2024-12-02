import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import Spinner from "@/components/Spinner";
import AOS from "aos";
import "aos/dist/aos.css";
import i18n from "../locales/i18n";
import CompanyContext from "../shared/context/CompanyContext";
import { UserProvider } from "@/shared/context/UserContext";
import { SavedExamsProvider } from "@/shared/context/SavedExamsContext"; // Import SavedExamsProvider
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/plugins/image.min.css";
import "froala-editor/css/plugins/video.min.css";
import "froala-editor/css/plugins/file.min.css";
import { SnackbarProvider } from "notistack";
import { ViewCountProvider } from "@/shared/context/ViewCountContext";
import { SessionProvider } from "next-auth/react";
function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Initialize selectedCompany from localStorage if available
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

  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 1300,
      once: true,
    });
    AOS.refresh();

    const handleStart = () => {
      setLoading(true);
    };
    const handleComplete = () => {
      setLoading(false);
    };

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
    const token = localStorage.getItem("token");

    const publicRoutes = ["/", "/haqqimizda"];

    const isPublicRoute = (pathname) => {
      if (publicRoutes.includes(pathname)) {
        return true;
      }

      if (
        pathname.startsWith("/exams/") ||
        pathname.startsWith("/imtahanlar/") ||
        pathname.startsWith("/imtahanlar") ||
        pathname.startsWith("/etrafli/")
      ) {
        return true;
      }

      return false;
    };

    if (!token && !isPublicRoute(router.pathname)) {
      router.replace("/");
    } else {
      setIsAuthChecked(true);
    }
  }, [router]);

  useEffect(() => {
    const { locale } = router;
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [router.locale]);

  if (!isAuthChecked) {
    return <Spinner />;
  }

  return (
    // Wrap the application with SavedExamsProvider and UserProvider'
    <SessionProvider session={pageProps.session}>
    <UserProvider>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top", // Position at the top
          horizontal: "right", // Align to the right
        }}
        autoHideDuration={1500}
        maxSnack={3}
      >
        <SavedExamsProvider>
          <ViewCountProvider>
            <CompanyContext.Provider
              value={{ selectedCompany, setSelectedCompany }}
            >
              {loading ? <Spinner /> : <Component {...pageProps} />}
            </CompanyContext.Provider>
          </ViewCountProvider>
        </SavedExamsProvider>
      </SnackbarProvider>
    </UserProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(App);
