import React from "react";

function PreviewQuestionSection({ selectedOption }) {
  return (
    <div className="py-10 px-40 bg-white shadow-createBox flex flex-col justify-center w-[75%] mx-auto rounded-lg">
      {/* Render question title and conditionally render content based on selectedOption */}
      <h2 className="font-gilroy text-xl font-semibold leading-normal text-darkBlue400 mb-8">
        {/* You can customize this question text or fetch it from state */}
        Aşağıdakı verilmiş cavablardan hansılar Exceldə pəncərəsə bölməsinə aiddir?
      </h2>

      {selectedOption === "Variantli sual" && (
        //  <div className="py-10 px-40 bg-white shadow-createBox flex flex-col justify-center rounded-lg">
        //  <h2 className="font-gilroy text-xl font-semibold leading-normal text-darkBlue400 mb-8">
        //    Aşağıdakı verilmiş cavablardan hansılar Exceldə pəncərəsə bölməsinə
        //    aiddir?
        //  </h2>
         <div className="flex flex-col gap-4">
           <div className="flex items-center w-[50%] p-2 rounded-xl border border-green600 font-gilroy text-green600">
             <label className="flex items-center">
               <input
                 type="radio"
                 name="answer"
                 className="hidden"
                 checked
                 readOnly
               />
               <span className="w-4 h-4 border-2 border-inputBorder rounded-full flex-shrink-0 flex items-center justify-center">
                 <span className="w-2 h-2 bg-brandBlue500 rounded-full"></span>
               </span>
               <span className="ml-3 font-gilroy">A)</span>
             </label>
             <span className="ml-2">Name box, Formula bar, Cell</span>
           </div>
           <div className="flex items-center w-[50%] p-2 rounded-xl border border-buttonGhostPressed font-gilroy text-buttonPressedPrimary">
             <label className="flex items-center">
               <input
                 type="radio"
                 name="answer"
                 className="hidden"
                 checked
                 readOnly
               />
               <span className="w-4 h-4 border-2 border-inputBorder rounded-full flex-shrink-0 flex items-center justify-center">
                 {/* <span className="w-2 h-2 bg-brandBlue500 rounded-full"></span> */}
               </span>
               <span className="ml-3 font-gilroy">B)</span>
             </label>
             <span className="ml-2">Name box, Formula bar, Cell</span>
           </div>
           <div className="flex items-center w-[50%] p-2 rounded-xl border border-buttonGhostPressed font-gilroy text-buttonPressedPrimary">
             <label className="flex items-center">
               <input
                 type="radio"
                 name="answer"
                 className="hidden"
                 checked
                 readOnly
               />
               <span className="w-4 h-4 border-2 border-inputBorder rounded-full flex-shrink-0 flex items-center justify-center">
                 {/* <span className="w-2 h-2 bg-brandBlue500 rounded-full"></span> */}
               </span>
               <span className="ml-3 font-gilroy">C)</span>
             </label>
             <span className="ml-2">Name box, Formula bar, Cell</span>
           </div>
           <div className="flex items-center w-[50%] p-2 rounded-xl border border-buttonGhostPressed font-gilroy text-buttonPressedPrimary">
             <label className="flex items-center">
               <input
                 type="radio"
                 name="answer"
                 className="hidden"
                 checked
                 readOnly
               />
               <span className="w-4 h-4 border-2 border-inputBorder rounded-full flex-shrink-0 flex items-center justify-center">
                 {/* <span className="w-2 h-2 bg-brandBlue500 rounded-full"></span> */}
               </span>
               <span className="ml-3 font-gilroy">D)</span>
             </label>
             <span className="ml-2">Name box, Formula bar, Cell</span>
           </div>
         </div>
    //    </div>
      )}

      {selectedOption === "Açıq sual" && (
        <div>
          {/* Render content for Açıq sual */}
          <p className="font-gilroy text-lg leading-normal text-darkBlue400 mb-8">
            Bu sualın cavabını yazın:
          </p>
          <textarea
            className="w-full h-32 p-4 border rounded-lg"
            placeholder="Cavabınızı buraya yazın..."
            readOnly
          />
        </div>
      )}

      {selectedOption === "Kombinasiya sualı" && (
        <div>
          {/* Render content for Kombinasiya sualı */}
          <p className="font-gilroy text-lg leading-normal text-darkBlue400 mb-8">
            Kombinasiya sualı üçün uyğun cavabları seçin:
          </p>
          {/* Add your specific content for Kombinasiya sualı */}
        </div>
      )}
    </div>
  );
}

export default PreviewQuestionSection;
