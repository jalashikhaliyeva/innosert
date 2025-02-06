import React, { useContext, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import axios from "axios"; // Assuming axios is used for API calls
import CompanyContext from "@/shared/context/CompanyContext";

function DeleteReportModal({ onCancel, onDelete, actionType, selectedId }) {
  console.log(selectedId, "selectedId");
  const { selectedCompany, token } = useContext(CompanyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const confirmationMessage =
    actionType === "Düzəliş edildi"
      ? "Düzəliş edilməyinə əminsinizmi?"
      : "Xəta olmadığına əminsinizmi?";

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const status = actionType === "Düzəliş edildi" ? 1 : 0;
      await axios.post(
        `https://api.innosert.az/api/report-question/${selectedId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Company-ID": selectedCompany.id,
          },
        }
      );

      onDelete();
    } catch (error) {
      console.error("Failed to update report status:", error);
      setError("Əməliyyat uğursuz oldu. Zəhmət olmasa yenidən cəhd edin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-[999]"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-100">
            <IoWarningOutline
              style={{ fontSize: "32px", color: "orange", fill: "orange" }}
            />
          </div>
        </div>

        <h3
          className="text-lg font-semibold text-gray-900 text-center"
          style={{ fontFamily: "Gilroy" }}
        >
          {actionType === "Düzəliş edildi"
            ? "Düzəliş edildi təsdiqi"
            : "Xəta deyil təsdiqi"}
        </h3>

        <p
          className="text-sm text-gray-600 text-center mt-2"
          style={{ fontFamily: "Gilroy" }}
        >
          {confirmationMessage} Bu əməliyyat geri alına bilməz.
        </p>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <div className="mt-6 flex justify-between">
          <button
            onClick={onCancel}
            className="w-full py-2 px-4 mr-2 bg-buttonSecondaryDefault text-gray-700 rounded-lg hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed focus:outline-none"
            style={{ fontFamily: "Gilroy" }}
            disabled={isLoading}
          >
            Ləğv et
          </button>
          <button
            onClick={handleDelete}
            className="w-full py-2 px-4 ml-2 bg-orange-300 text-textSecondaryDefault rounded-lg hover:bg-orange-200 active:bg-errorButtonPressed focus:outline-none"
            style={{ fontFamily: "Gilroy" }}
            disabled={isLoading}
          >
            {isLoading ? "Yüklənir..." : "Təsdiq et"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteReportModal;
