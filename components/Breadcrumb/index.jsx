import { useRouter } from "next/router";
import Link from "next/link";
import { useMemo } from "react";
import { useTranslation } from "react-i18next"; // Assuming you're using react-i18next

const Breadcrumb = () => {
  const router = useRouter();
  const { t } = useTranslation(); // Initialize the translation function

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
    "privacy-policy": "breadcrumbs.privacyPolicy",
    // Add more mappings as needed
  };

  const pathSegments = router.asPath
    .split("/")
    .filter((segment) => segment)
    .map((segment) => decodeURIComponent(segment.split("?")[0])); // Remove query parameters

  const formatLabel = (segment) => {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const breadcrumbItems = useMemo(() => {
    const items = [];

    pathSegments.forEach((segment, index) => {
      // Skip 'home' and 'profil' as they are handled statically
      if (segment === "home" || segment === "profil") return;

      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const translationKey = pathToTranslationKey[segment];
      const isLast = index === pathSegments.length - 1;

      if (Array.isArray(translationKey)) {
        translationKey.forEach((key, subIndex) => {
          const label = t(key);
          const isLastSubItem =
            isLast && subIndex === translationKey.length - 1;

          items.push(
            <div key={`${path}-${subIndex}`} className="flex items-center">
              {subIndex !== 0 && (
                <span className="font-gilroy text-base font-normal leading-6 text-grayText mx-2">
                  /
                </span>
              )}
              {isLastSubItem ? (
                <span className="font-gilroy text-base font-normal leading-6 text-textSecondaryDefault">
                  {label}
                </span>
              ) : (
                <Link href={path}>
                  <span className="font-gilroy text-base font-normal leading-6 text-grayText hover:text-textSecondaryDefault cursor-pointer transition-colors duration-300 ease-in-out">
                    {label}
                  </span>
                </Link>
              )}
            </div>
          );
        });
      } else {
        const label = translationKey ? t(translationKey) : formatLabel(segment);

        items.push(
          <div key={path} className="flex items-center">
            <span className="font-gilroy text-base font-normal leading-6 text-grayText mx-2">
              /
            </span>
            {isLast ? (
              <span className="font-gilroy text-base font-normal leading-6 text-textSecondaryDefault">
                {label}
              </span>
            ) : (
              <Link href={path}>
                <span className="font-gilroy text-base font-normal leading-6 text-grayText hover:text-textSecondaryDefault cursor-pointer transition-colors duration-300 ease-in-out">
                  {label}
                </span>
              </Link>
            )}
          </div>
        );
      }
    });

    return items;
  }, [pathSegments, t]);

  // Determine if "Profil" should be shown based on the current path
  const showProfile = router.pathname.startsWith("/hesablarim");

  return (
    <div className="flex flex-wrap md:flex-nowrap flex-row gap-3 mb-6 mt-24 md:mt-32">
   
      <Link href="/home">
        <span className="font-gilroy text-base font-normal leading-6 text-grayText hover:text-textSecondaryDefault cursor-pointer transition-colors duration-300 ease-in-out">
          {t("breadcrumbs.home")}
        </span>
      </Link>

   
      {showProfile && (
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

    
      {breadcrumbItems}
    </div>
  );
};

export default Breadcrumb;
