import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function TitleNavigation() {
  const { t } = useTranslation();
  // Map URL paths to their corresponding titles
  const titleMap = {
    "/neticelerim": t("titles.neticelerim"),
    "/imtahanlarim": t("titles.imtahanlarim"),
    "/suallar": t("titles.suallar"),
    "/sertifikatlarim": t("titles.sertifikatlarim"),
    "/balansim": t("titles.balansim"),
  };
  const router = useRouter();
  const path = router.pathname;

  // Get the title based on the current path or default to "TitleNavigation"
  const title = titleMap[path] || "TitleNavigation";

  return (
    <div className="font-gilroy text-2xl font-medium leading-8 pb-6">
      {title}
    </div>
  );
}

export default TitleNavigation;
