import DOMPurify from "dompurify";

function PreviewQuestionSection({
  selectedOption,
  titleText,
  conditionText,
  answers,
  openAnswer,
  kombinasiyaOptions,
  kombinasiyaQuestions
}) {
  // A helper to strip HTML
  const stripHtml = (html) => {
    return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
  };

  return (
    <div className="py-10 px-6 md:px-20 lg:px-40 bg-white shadow-createBox flex flex-col justify-center w-full md:w-[85%] lg:w-[75%] mx-auto rounded-lg">
      {/* Render question title and condition */}
      <h2
        className="font-gilroy text-lg md:text-xl font-medium leading-normal text-darkBlue400 mb-8"
        dangerouslySetInnerHTML={{ __html: titleText }}
      ></h2>
      <div
        className="text-darkBlue400 mb-8 font-gilroy"
        dangerouslySetInnerHTML={{ __html: conditionText }}
      ></div>

      {selectedOption === "Variantli sual" && (
        <div className="flex flex-col gap-4">
          {answers?.map((ans, idx) => {
            return (
              <div
                key={ans.id}
                className={`flex items-center w-full md:w-[70%] lg:w-[50%] p-2 rounded-xl border font-gilroy ${
                  ans.correct
                    ? "border-green600 text-green600"
                    : "border-buttonGhostPressed text-buttonPressedPrimary"
                }`}
              >
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="answer"
                    className="hidden"
                    readOnly
                  />
                  <span className="w-4 h-4 border-2 border-inputBorder rounded-full flex-shrink-0 flex items-center justify-center mr-3">
                    {ans.correct && <span className="w-2 h-2 bg-brandBlue500 rounded-full"></span>}
                  </span>
                  <span className="font-gilroy mr-2">{ans.label.charAt(0)})</span>
                </label>
                <span
                  className="ml-2"
                  dangerouslySetInnerHTML={{ __html: ans.text || "" }}
                />
              </div>
            );
          })}
        </div>
      )}

      {selectedOption === "Açıq sual" && (
        <div>
          <p className="font-gilroy text-lg leading-normal text-darkBlue400 mb-4">
            Cavabı yazın:
          </p>
          <div className="w-full md:w-[70%] lg:w-[50%] p-4 rounded-lg border font-gilroy text-darkBlue400">
            <span
              dangerouslySetInnerHTML={{ __html: openAnswer || "Cavab əlavə olunmayıb" }}
            />
          </div>
        </div>
      )}

      {selectedOption === "Kombinasiya sualı" && (
        <div>
          <h2 className="text-lg sm:text-xl font-gilroy font-semibold mb-6">
            {`Kombinasiya suallarını uyğunlaşdırın:`}
          </h2>
          <div className="flex flex-row">
            {/* Left Column: Questions with dropdowns */}
            <div className="flex flex-col space-y-6 font-gilroy w-1/2">
              {kombinasiyaQuestions.map((question, index) => (
                <div key={question.id} className="flex flex-col space-y-2">
                  <span className="font-gilroy font-normal text-lg">
                    {index + 1}.
                  </span>
                  <div
                    className="py-2 px-4 border rounded-lg font-gilroy text-grayButtonText text-lg w-full"
                    dangerouslySetInnerHTML={{
                      __html: question.questionText || "Sual mətnini daxil edin",
                    }}
                  />
                  <div className="py-2 px-4 border rounded-lg font-gilroy text-grayButtonText text-lg w-full">
                    {question.selectedOptions && question.selectedOptions.length > 0 ? (
                      question.selectedOptions.map((optId) => {
                        const opt = kombinasiyaOptions.find((o) => o.id === optId);
                        if (!opt) return null;
                        return (
                          <span
                            key={optId}
                            className="bg-buttonGhostPressed px-4 py-1 rounded-md mr-2 inline-block"
                          >
                            {opt.label}: {stripHtml(opt.text)}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-[#B2B2B2]">
                        Cavabları əlavə edin
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Right Column: All Kombinasiya Options */}
            <div className="w-1/2 font-gilroy ml-4">
              <h3 className="font-normal mb-2">Cavablar</h3>
              {kombinasiyaOptions.map((option) => (
                <div
                  key={option.id}
                  className="py-2 px-4 my-4 border rounded-lg font-gilroy text-grayButtonText text-lg w-full"
                >
                  {option.label}: {stripHtml(option.text)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PreviewQuestionSection;
