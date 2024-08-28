import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import styles from "./faqSect.module.css";
import { useEffect, useState } from "react";

export default function Faq() {
  const [isClient, setIsClient] = useState(false);

  const faq = [
    {
      question: "Nəticələrin analizi necə aparılır?",
      answer:
        "Platformamızda imtahan nəticələri avtomatik olaraq təhlil olunur və istifadəçilərə irəliləyişləri və inkişaf etdirilməsi lazım olan sahələri göstərilir.",
    },
    {
      question: "Şirkət hesablarının izlənməsi üçün hansı alətlər mövcuddur?",
      answer:
        "Şirkət hesabları mərkəzləşdirilmiş panel vasitəsilə izlənilir, burada istifadəçi fəaliyyəti, proqres və digər vacib məlumatlar real vaxtda göstərilir.",
    },
    {
      question: "Sertifikatlar necə saxlanılır və arxivləşdirilir?",
      answer:
        "Bütün əldə edilən sertifikatlar təhlükəsiz bulud yaddaşında saxlanılır və istənilən zaman yüklənməsi və paylaşılması üçün əlçatandır.",
    },
    {
      question: "Onlayn müraciət və qeydiyyat prosesi necə işləyir?",
      answer:
        "İstifadəçilər sadə onlayn forma dolduraraq asanlıqla müraciət edə və qeydiyyatdan keçə bilərlər. Proses intuitivdir və cəmi bir neçə dəqiqə vaxt alır.",
    },
    {
      question: "Tələbələrin irəliləyişini necə izləyə bilərəm?",
      answer:
        "Tələbələrin proqresini xüsusi dashboard vasitəsilə izləyə bilərsiniz, burada onların imtahan nəticələri, tamamlanmış kurslar və digər fəaliyyətləri əks olunur.",
    },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <h3 className="pt-14 pb-10 text-center font-gilroy text-3xl font-medium text-textSecondaryDefault">
        Sualın var?
      </h3>
      <div className={styles.faqSection}>
        <div className="mx-auto">
          <div className="mx-auto rounded-xl divide-y">
            {faq.map((item, index) => (
              <Disclosure
                as="div"
                className="p-6 mb-4"
                key={index}
                defaultOpen={index === 0}
              >
                {({ open }) => (
                  <>
                    <DisclosureButton className="group flex w-full items-center">
                      <span className="text-xl font-gilroy font-medium flex-1 text-left">
                        {item.question}
                      </span>
                      <span className="ml-4">
                        {open ? (
                          <MinusIcon className="size-7 fill-black group-hover:fill-black/50" />
                        ) : (
                          <PlusIcon className="size-7 fill-black group-hover:fill-black/50" />
                        )}
                      </span>
                    </DisclosureButton>
                    <DisclosurePanel
                      className={`pt-3 text-lg font-normal tracking-036 text-grayTextinBox transition-all duration-600 ease-in-out transform ${
                        open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {item.answer}
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
