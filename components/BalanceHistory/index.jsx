import React, { useState } from "react";

const MyComponent = () => {
  const [showCompanies, setShowCompanies] = useState(false);

  const toggleShowCompanies = () => {
    setShowCompanies(!showCompanies);
  };

  return (
    <div className="mt-6">
      <div className="mb-6">
        <h2 className="text-2xl leading-8 font-gilroy font-medium">
          {showCompanies ? "Yükləmələrim" : "Tarixçə"}{" "}
          {/* Toggles between "Tarixçə" and "Yükləmələrim" */}
        </h2>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-row gap-2">
          <button
            className={`text-base px-4 py-2 h-10 rounded-lg font-normal font-gilroy leading-6 ${
              !showCompanies ? "bg-blue100 text-blue400" : "text-neutral700"
            }`}
            onClick={() => setShowCompanies(false)}
          >
            Tarixçə
          </button>
          <button
            className={`text-base px-4 py-2 h-10 rounded-lg font-normal font-gilroy leading-6 ${
              showCompanies ? "bg-blue100 text-blue400" : "text-neutral700"
            }`}
            onClick={toggleShowCompanies}
          >
            Yükləmələrim
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
