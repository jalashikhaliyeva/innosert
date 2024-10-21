// import Image from "next/image";
// import React, { useState } from "react";
// import { FiLink } from "react-icons/fi";

// function MyCertificates() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCertificate, setSelectedCertificate] = useState(null);
//   const [certificateURL, setCertificateURL] = useState("");
//   const [copySuccess, setCopySuccess] = useState(false);

//   const certificates = [
//     "/img/Sertifikat1.png",
//     "/img/Sertifikat1.png",
//     "/img/Sertifikat1.png",
//     "/img/Sertifikat1.png",
//     "/img/Sertifikat1.png",
//   ];

//   const openModal = (certificate) => {
//     setSelectedCertificate(certificate);
//     setCertificateURL(window.location.origin + certificate);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedCertificate(null);
//     setIsModalOpen(false);
//     setCopySuccess(false);
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(certificateURL).then(
//       () => {
//         setCopySuccess(true);
//         setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
//       },
//       (err) => {
//         console.error("Could not copy text: ", err);
//       }
//     );
//   };

//   const shareCertificate = () => {
//     if (navigator.share) {
//       navigator
//         .share({
//           title: "My Certificate",
//           url: certificateURL,
//         })
//         .then(() => console.log("Successfully shared"))
//         .catch((error) =>
//           console.error("Something went wrong sharing", error)
//         );
//     } else {
//       alert("Web Share API is not supported in your browser.");
//     }
//   };

//   return (
//     <div className="flex flex-wrap w-full gap-5">
//       {certificates.map((cert, index) => (
//         <div key={index} className="w-[32%] h-[279px]">
//           <Image
//             src={cert}
//             width={348}
//             height={279}
//             alt="Certificate"
//             className="object-cover shadow-certificate cursor-pointer"
//             onClick={() => openModal(cert)}
//           />
//         </div>
//       ))}

//       {isModalOpen && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//           onClick={closeModal}
//         >
//           <div
//             className="bg-white p-4 rounded-lg"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <Image
//               src={selectedCertificate}
//               width={700}
//               height={500}
//               alt="Certificate"
//               className="object-contain"
//             />

//             <div className="flex items-center justify-center gap-5 mt-8">
//               <div className="relative w-full max-w-md">
//                 <FiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

//                 <input
//                   type="text"
//                   value={certificateURL}
//                   readOnly
//                   className="w-full pl-10 pr-28 py-2 rounded border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed focus:outline-none"
//                 />
//                 <button
//                   className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-buttonPrimaryDefault text-white rounded"
//                   onClick={copyToClipboard}
//                 >
//                   {copySuccess ? "Kopyalandı" : "Kopyala"}
//                 </button>
//               </div>
//               <button
//                 className="px-4 py-2 bg-gray-800 text-white rounded"
//                 onClick={shareCertificate}
//               >
//                 Paylaş
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MyCertificates;

import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

function MyCertificates() {
  const router = useRouter();

  const certificates = [
    { id: 1, src: "/img/Sertifikat1.png" },
    { id: 2, src: "/img/Sertifikat1.png" },
    { id: 3, src: "/img/Sertifikat1.png" },
    { id: 4, src: "/img/Sertifikat1.png" },
    { id: 5, src: "/img/Sertifikat1.png" },
  ];

  return (
    <div className="flex flex-wrap w-full gap-5 mb-10">
      {certificates.map((cert) => (
        <div
          key={cert.id}
          className="w-full sm:w-[48%] md:w-[32%] h-[279px] relative overflow-hidden rounded-lg shadow-certificate hover:shadow-hoverCertificate transition-shadow duration-300"
        >
          <Image
            src={cert.src}
            layout="fill"
            objectFit="cover"
            alt="Certificate"
            className="object-cover cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
            onClick={() => router.push(`/sertifikatlarim/${cert.id}`)}
          />
        </div>
      ))}
    </div>
  );
}

export default MyCertificates;
