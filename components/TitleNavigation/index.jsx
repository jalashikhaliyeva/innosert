import React from "react";
import { useRouter } from "next/router";

// Map URL paths to their corresponding titles
const titleMap = {
  "/neticelerim": "Nəticələrim",
  "/imtahanlarim": "İmtahanlarım",
  "/suallar": "Suallar Toplusu",
  "/sertifikatlarim": "Sertifikatlarım",
  "/balansim": "Balansım",
};

function TitleNavigation() {
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
