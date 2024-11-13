// ImtahanlarComponent.jsx

import React, { useContext, useEffect, useState } from "react";
import ExamsListTeacher from "@/components/ExamsListTeacher";
import axios from "axios";
import CompanyContext from "@/shared/context/CompanyContext";
import EditExamModal from "@/components/EditExamModal";
import DeleteExamModal from "@/components/DeleteExamModal";
import Spinner from "../Spinner";
import { useTranslation } from "react-i18next";
function ImtahanlarComponent({ viewMode, sortOption, id }) {
  const { selectedCompany } = useContext(CompanyContext);
  const [examsData, setExamsData] = useState({ exams: [], folders: [] });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  // State for Modals
  const [isEditExamModalOpen, setIsEditExamModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  // State to manage selected exams
  const [selectedExams, setSelectedExams] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    if (id && selectedCompany && token) {
      const fetchExams = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            `https://innocert-admin.markup.az/api/me/company-teachers-activity/exams/${id}`,
            // `https://innocert-admin.markup.az/api/me/company-teachers-activity/exams/147`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "X-Company-ID": selectedCompany.id,
              },
            }
          );

          if (response.data && response.data.status) {
            setExamsData({
              exams: response.data.data, // Ensure this includes author fields
              folders: [], // No folders in the current data
            });
            console.log(response.data, "response.data");
          } else {
            setError(response.data.message || "Failed to fetch exams");
          }
        } catch (err) {
          console.error("Error fetching exams:", err);
          setError("An error occurred while fetching exams.");
        } finally {
          setLoading(false);
        }
      };

      fetchExams();
    }
  }, [id, selectedCompany, token]);

  // Function to open Edit Exam Modal
  const openEditExamModal = (exam) => {
    setSelectedExam(exam);
    setIsEditExamModalOpen(true);
  };

  // Function to close Edit Exam Modal
  const closeEditExamModal = () => {
    setSelectedExam(null);
    setIsEditExamModalOpen(false);
  };

  // Function to open Delete Exam Modal
  const openDeleteExamModal = (exam) => {
    setSelectedExam(exam);
    setIsDeleteModalOpen(true);
  };

  // Function to close Delete Exam Modal
  const closeDeleteModal = () => {
    setSelectedExam(null);
    setIsDeleteModalOpen(false);
  };

  // Function to handle Exam Update
  const handleExamUpdate = (updatedExam) => {
    setExamsData((prevData) => ({
      ...prevData,
      exams: prevData.exams.map((exam) =>
        exam.id === updatedExam.id ? updatedExam : exam
      ),
    }));
  };

  // Function to handle Exam Deletion
  const handleExamDeletion = (deletedExamId) => {
    setExamsData((prevData) => ({
      ...prevData,
      exams: prevData.exams.filter((exam) => exam.id !== deletedExamId),
    }));
  };

  if (loading)
    return (
      <>
        <Spinner />
      </>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {examsData.exams.length === 0 ? (
        <div className="flex items-center justify-center ">
          <p className="font-gilroy text-grayButtonText text-lg">
            {t("messages.noExamsForUser")}
          </p>
        </div>
      ) : (
        <ExamsListTeacher
          exams={examsData}
          viewMode="grid" // Use the passed viewMode prop
          sortOption={sortOption}
          openEditExamModal={openEditExamModal}
          openDeleteExamModal={openDeleteExamModal}
          selectedExams={selectedExams}
          setSelectedExams={setSelectedExams}
          showTeacherName={true} // **Add this line**
        />
      )}

      {/* Edit Exam Modal */}
      {isEditExamModalOpen && selectedExam && (
        <EditExamModal
          exam={selectedExam}
          closeModal={closeEditExamModal}
          onExamUpdate={handleExamUpdate}
        />
      )}

      {/* Delete Exam Modal */}
      {isDeleteModalOpen && selectedExam && (
        <DeleteExamModal
          item={selectedExam} // Changed from 'exam' to 'item'
          onDelete={(id) => {
            // Modify to accept id
            handleExamDeletion(id);
            closeDeleteModal();
          }}
          onCancel={closeDeleteModal}
        />
      )}
    </div>
  );
}

export default ImtahanlarComponent;
