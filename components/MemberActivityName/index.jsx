import React from "react";
import { useTranslation } from "react-i18next";

function MemberActivityName({ memberActivitySingle }) {
  const { t } = useTranslation();
  // console.log(memberActivitySingle, "memberActivitySingle");

  return (
    <div className="flex justify-between relative font-gilroy mb-6">
      <h1 className="text-2xl font-medium leading-8">
        {t("members.member")} {memberActivitySingle}
      </h1>
    </div>
  );
}

export default MemberActivityName;
