import { useRouter } from "next/router";
import Link from "next/link";
import { useMemo } from "react";
import { useTranslation } from "react-i18next"; // Assuming you're using react-i18next

const Breadcrumb = () => {
  const router = useRouter();
  const { t } = useTranslation(); // Initialize the translation function

  // Define a mapping from path segments to translation keys
  const pathToTranslationKey = {
    home: "breadcrumbs.home",
    profil: "breadcrumbs.profile",
    bloq: "breadcrumbs.blog",
    fayllar: "breadcrumbs.files",
    backend: "breadcrumbs.backend",
    english: "breadcrumbs.english",
    neticelerim: "breadcrumbs.results",
    imtahanlarim: "breadcrumbs.exams",
    sertifikatlarim: "breadcrumbs.certificates",
    balansim: "breadcrumbs.balance",
    hesablarim: "breadcrumbs.accounts",
    "suallar-toplusu": "breadcrumbs.questionCollection",
    "xeta-bildirisleri": "breadcrumbs.errorNotifications",
    uzvler: "breadcrumbs.members",
    "uzv-aktivliyi": "breadcrumbs.memberActivity",
    "sual-bazasi": "breadcrumbs.questionDatabase",
    "umumi-imtahanlar": "breadcrumbs.generalExams",
    "imtahan-detallari": "breadcrumbs.examDetails",
    "imtahan-redakte": "breadcrumbs.examEdit",
    // Add more mappings as needed
  };

  // Use asPath to get the actual path with dynamic segments
  const pathSegments = router.asPath
    .split("/")
    .filter((segment) => segment)
    .map((segment) => decodeURIComponent(segment.split('?')[0])); // Remove query parameters

  // Function to format labels if not in mapping
  const formatLabel = (segment) => {
    // Replace hyphens with spaces and capitalize first letter of each word
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Construct dynamic breadcrumb items from the URL segments
  const breadcrumbItems = useMemo(() => {
    return pathSegments.map((segment, index) => {
      // Skip 'home' and 'profil' as they are handled statically
      if (segment === "home" || segment === "profil") return null;

      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const translationKey = pathToTranslationKey[segment];
      const label = translationKey ? t(translationKey) : formatLabel(segment);
      const isLast = index === pathSegments.length - 1;

      return (
        <div key={path} className="flex items-center">
          <span className="font-gilroy text-base font-normal leading-6 text-grayText mx-2">
            /
          </span>
          {isLast ? (
            // Render the last segment as plain text with active styling
            <span className="font-gilroy text-base font-normal leading-6 text-textSecondaryDefault">
              {label}
            </span>
          ) : (
            // Render other segments as links with default styling
            <Link href={path}>
              <span className="font-gilroy text-base font-normal leading-6 text-grayText hover:text-textSecondaryDefault cursor-pointer transition-colors duration-300 ease-in-out">
                {label}
              </span>
            </Link>
          )}
        </div>
      );
    });
  }, [pathSegments, t]);

  // Check if the current path is /bloq or starts with /bloq/
  const isBloqPath =
    router.pathname === "/bloq" || router.pathname.startsWith("/bloq/");

  return (
    <div className="flex flex-wrap md:flex-nowrap flex-row gap-3 mb-6 mt-24 md:mt-32">
      {/* Static home link */}
      <Link href="/home">
        <span className="font-gilroy text-base font-normal leading-6 text-grayText hover:text-textSecondaryDefault cursor-pointer transition-colors duration-300 ease-in-out">
          {t("breadcrumbs.home")}
        </span>
      </Link>

      {/* Render static separator and profile link if not on /bloq path */}
      {!isBloqPath && (
        <>
          <span className="font-gilroy text-base font-normal leading-6 text-grayText mx-2">
            /
          </span>
          <Link href="/hesablarim">
            <span className="font-gilroy text-base font-normal leading-6 text-grayText hover:text-textSecondaryDefault cursor-pointer transition-colors duration-300 ease-in-out">
              {t("breadcrumbs.profile")}
            </span>
          </Link>
        </>
      )}

      {/* Render dynamic breadcrumb items */}
      {breadcrumbItems}
    </div>
  );
};

export default Breadcrumb;
