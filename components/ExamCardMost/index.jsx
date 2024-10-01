import Image from "next/image";
import React from "react";

function ExamCardMost() {
  return (
    <div className="h-[260px]  px-5 py-8 flex flex-col bg-[url('/img/certificare-frame.png')] border-2 border-buttonSecondaryDisabled">
      <div className="flex justify-end">
        <Image src="/img/Badge.png" alt="Exam Badge" width={37} height={37} />
      </div>
      <div className="pb-6">
        <div className="flex gap-2">
          <Image
            src="/img/handexLogo.png"
            alt="Exam Badge"
            width={40}
            height={40}
            className="object-contain"
          />
          <h3 className="font-gilroy text-base text-grayText70">Handex</h3>
        </div>
        <p className="pt-2.5 font-gilroy text-xl leading-8 text-textSecondaryDefault font-medium">
          Microsoft Office Specialist Excel Expert
        </p>
      </div>
      <div className="flex justify-end">
        <Image
          src="/logo/dark-logo-innosert.png"
          alt="innosert logo"
          width={53}
          height={17}
        />
      </div>
    </div>
  );
}

export default ExamCardMost;
