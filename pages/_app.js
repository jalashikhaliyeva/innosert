// pages/_app.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import Spinner from "@/components/Spinner";
import AOS from "aos";
import "aos/dist/aos.css";
import i18n from "../locales/i18n";
import CompanyContext from "../shared/context/CompanyContext";
import { UserProvider } from "@/shared/context/UserContext";
// import { UserProvider } from "../shared/contexts/UserContext"; 

function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Initialize selectedCompany from localStorage if available
  useEffect(() => {
    // On component mount, check if a company is stored in localStorage
    const storedCompany = localStorage.getItem("selectedCompany");
    if (storedCompany) {
      setSelectedCompany(JSON.parse(storedCompany));
    }
  }, []);

  useEffect(() => {
    // When selectedCompany changes, update localStorage
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

    // Define public routes that can be accessed without authentication
    const publicRoutes = ["/", "/haqqimizda"];

    // Function to check if the current route is public
    const isPublicRoute = (pathname) => {
      if (publicRoutes.includes(pathname)) {
        return true;
      }

      // Allow any route that starts with '/exams/'
      if (
        pathname.startsWith("/exams/") ||
        pathname.startsWith("/imtahanlar/")
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
    // Wrap your application with the UserProvider
    <UserProvider>
      {/* If CompanyContext depends on UserContext, wrap it inside UserProvider */}
      <CompanyContext.Provider value={{ selectedCompany, setSelectedCompany }}>
        {loading ? <Spinner /> : <Component {...pageProps} />}
      </CompanyContext.Provider>
    </UserProvider>
  );
}

export default appWithTranslation(App);
