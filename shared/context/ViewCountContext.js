import React, { createContext, useState, useEffect } from "react";

export const ViewCountContext = createContext();

export const ViewCountProvider = ({ children }) => {
  const [viewCounts, setViewCounts] = useState({});

  useEffect(() => {
    const storedCounts = localStorage.getItem("viewCounts");
    if (storedCounts) {
      setViewCounts(JSON.parse(storedCounts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("viewCounts", JSON.stringify(viewCounts));
  }, [viewCounts]);

  const updateViewCount = (slug, count) => {
    setViewCounts((prev) => ({
      ...prev,
      [slug]: (prev[slug] || count) + 1,
    }));
  };

  return (
    <ViewCountContext.Provider value={{ viewCounts, updateViewCount }}>
      {children}
    </ViewCountContext.Provider>
  );
};
