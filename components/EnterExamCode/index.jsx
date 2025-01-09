import React, { useContext, useState, useEffect } from "react";
import { FiLock } from "react-icons/fi";
import axios from "axios";
import { UserContext } from "@/shared/context/UserContext";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";

function EnterExamCode() {
  const { t } = useTranslation();
  const { setPrivateExam, privateExam } = useContext(UserContext);
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);

  const handleCodeSubmit = async (e) => {
    e.preventDefault(); // Prevent any default form behavior
    try {
      const response = await axios.post(
        "https://innocert-admin.markup.az/api/private-exam",
        { code: code }
      );
      const { exam } = response.data;
      // console.log(response.data, "private response");

      setPrivateExam(exam);
      localStorage.setItem("privateExam", JSON.stringify(exam));
      // toast.success("İmtahan uğurla tapıldı.");
      const notFound = response.data.status;
      if (notFound === false) {
        toast.warning(t("examNotFound"));
      } else {
        toast.success(t("examFound"));
      }

      setError(null);
    } catch (err) {
      setError("Kod səhvdir və ya imtahan tapılmadı.");
      toast.error("Kod səhvdir, imtahan tapılmadı.");
      setPrivateExam(null);
      localStorage.removeItem("privateExam");
    }
  };

  useEffect(() => {
    if (code === "") {
      setPrivateExam(null);
      localStorage.removeItem("privateExam");
    }
  }, [code, setPrivateExam]);

  return (
    <div className="lg:w-[50%] h-full flex justify-end -mt-[45px] md:-mt-0">
      <div className="bg-[url('/img/CodeEnter.png')] bg-no-repeat bg-cover bg-center w-full lg:w-[400px] h-full px-8 py-14 rounded-xl flex flex-col items-center">
        <h5 className="font-gilroy text-2xl font-medium leading-8 text-inputBgDefault pb-3 text-center w-auto">
          {t("enter_exam_code")}
        </h5>
        <p className="font-gilroy text-lg text-inputBgDefault font-normal tracking-036 text-center w-auto">
          {t("exams_visible_after_code")}
        </p>
        <div className="flex items-center justify-center gap-5 mt-8">
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-inputBorderHover" />
            <input
              type="text"
              placeholder={t("enter_code_placeholder")}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full pl-10 pr-28 py-3 rounded-lg border border-gray-300 bg-inputBgDefault hover:bg-buttonSecondaryDefault hover:border-inputBorderHover text-gray-600 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCodeSubmit(e);
                }
              }}
            />
            <button
              onClick={handleCodeSubmit}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-buttonPrimaryDefault text-base text-white rounded-lg"
            >
              {t("search")}
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
      {/* <ToastContainer
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
      /> */}
    </div>
  );
}

export default EnterExamCode;
