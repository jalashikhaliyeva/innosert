import React, { useEffect, useState } from "react";
import ExamsListTeacher from "@/components/ExamsListTeacher";
import Spinner from "../Spinner";

function SubExamsListTeacher({ folderSlug, selectedExams, setSelectedExams, viewMode, sortOption  }) {
  const [exams, setExams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [selectedExams, setSelectedExams] = useState([]);

  const examsData = [
    {
      folder: true,
      name: "Mathematics Exams",
      slug: "mathematics-exams",
      date: "2024-10-20",
      exams: [
        {
          name: "Midterm",
          slug: "midterm-exam",
          date: "2024-10-01",
          subject: "Mathematics",
          level: "Orta",
          difficulty: "Asan",
          questions: 20,
          url: "/exams/midterm",
        },
        {
          name: "Pre Exam",
          slug: "final-exam",
          date: "2024-11-15",
          subject: "Mathematics",
          level: "Yüksək",
          difficulty: "Çətin",
          questions: 50,
          url: "/exams/final",
        },
      ],
    },
    {
      folder: false,
      name: "Physics Midterm Exam",
      slug: "midterm-physics-exam",
      date: "2024-10-10",
      subject: "Physics",
      level: "Orta",
      difficulty: "Orta",
      questions: 30,
      url: "/exams/physics-midterm",
    },
    {
      folder: true,
      name: "Biology Exams",
      slug: "biology-exams",
      date: "2024-12-20",
      exams: [
        {
          name: "Midterm Exam",
          slug: "midterm-biology-exam",
          date: "2024-10-05",
          subject: "Biology",
          level: "Orta",
          difficulty: "Asan",
          questions: 25,
          url: "/exams/biology-midterm",
        },
        {
          name: "Final Exam",
          slug: "final-biology-exam",
          date: "2024-12-10",
          subject: "Biology",
          level: "Yüksək",
          difficulty: "Çətin",
          questions: 50,
          url: "/exams/biology-final",
        },
      ],
    },
    {
      folder: true,
      name: "Frontend",
      slug: "frontend-exams",
      date: "2023-12-23",
      exams: [
        {
          name: "Final ",
          slug: "final-frontend-exam",
          date: "2024-10-05",
          subject: "Frontend",
          level: "Orta",
          difficulty: "Asan",
          questions: 45,
          url: "/exams/frontend-final",
        },
      ],
    },
  ];

  useEffect(() => {
    if (folderSlug === undefined) return; // Wait until folderSlug is defined

    // console.log("folderSlug:", folderSlug);

    const folder = examsData.find((exam) => exam.slug === folderSlug);
    // console.log("folder found:", folder);

    if (folder && folder.exams) {
      setExams(folder.exams);
    } else {
      setExams([]);
    }
    setIsLoading(false);
  }, [folderSlug]);

  if (isLoading) {
    return <div><Spinner /></div>;
  }

  return (
    <div>
      {exams.length > 0 ? (
        <ExamsListTeacher
          exams={exams}
       
          viewMode={viewMode} // Pass viewMode
          sortOption={sortOption} // Pass sortOption


          openEditExamModal={() => {}}
          openDeleteExamModal={() => {}}
          selectedExams={selectedExams}
          setSelectedExams={setSelectedExams}
        />
      ) : (
        <p>No exams found in this folder.</p>
      )}
    </div>
  );
}

export default SubExamsListTeacher;
