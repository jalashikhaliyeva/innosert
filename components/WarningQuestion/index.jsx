import React, { useState, useEffect, useRef } from "react";
import { PiWarningOctagon } from "react-icons/pi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WarningQuestion({ questionId, onSubmitReport }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [note, setNote] = useState("");
  const modalRef = useRef(null);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedTypes((prevTypes) =>
      checked
        ? [...prevTypes, value]
        : prevTypes.filter((type) => type !== value)
    );
  };

  const handleSubmit = () => {
    const reports = selectedTypes.map((type) => ({
      id: questionId,
      type: type === "Cavabda xəta var" ? "Cavabda xeta" : "Sualda xeta",
      title: note,
    }));
    onSubmitReport(reports);
    setIsModalOpen(false);
    setSelectedTypes([]);
    setNote("");

    // Show success toast
    toast.success("Probleminiz uğurla bildirildi!");
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const isCheckboxSelected = selectedTypes.length > 0;

  return (
    <div className="flex justify-end pb-4">
      <button onClick={handleModalToggle}>
        <PiWarningOctagon className="size-6" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="relative bg-white p-10 rounded-xl shadow-elevation3 w-[400px] m-5 lg:m-0"
          >
            <button
              className="absolute top-2 right-5 text-2xl"
              onClick={handleModalToggle}
            >
              &times;
            </button>

            <div className="flex flex-col">
              <div className="flex items-center justify-center mb-3">
                <PiWarningOctagon className="size-9 text-red500" />
              </div>
              <h2 className="text-2xl mb-2 leading-8 font-medium text-brandBlue500 font-gilroy text-center items-center flex justify-center">
                Problemi bildir
              </h2>
              <p className="text-grayButtonText mb-4 text-center font-gilroy">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            <div className="flex flex-col gap-2 mb-10">
              <label className="flex items-center border p-2 rounded-xl font-gilroy">
                <input
                  type="checkbox"
                  className="mr-2"
                  value="Sualda xəta var"
                  onChange={handleCheckboxChange}
                />
                Sualda xəta var
              </label>
              <label className="flex items-center border p-2 rounded-xl font-gilroy">
                <input
                  type="checkbox"
                  className="mr-2"
                  value="Cavabda xəta var"
                  onChange={handleCheckboxChange}
                />
                Cavabda xəta var
              </label>
            </div>

            <p className="pb-2 font-gilroy">Qeydiniz</p>
            <textarea
              className="w-full p-2 border rounded-xl mb-4"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <div className="flex gap-2 items-center justify-center">
              <button
                onClick={handleModalToggle}
                className="px-4 py-2 text-lg text-grayButtonText font-gilroy rounded-lg bg-buttonSecondaryDefault hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed w-full"
              >
                Ləğv et
              </button>
              <button
                disabled={!isCheckboxSelected}
                onClick={handleSubmit}
                className={`px-4 py-2 text-lg font-gilroy rounded-lg ${
                  isCheckboxSelected
                    ? "bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
                    : "bg-gray-300 cursor-not-allowed"
                } text-white w-full`}
              >
                Göndər
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
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
      />
    </div>
  );
}

export default WarningQuestion;
