// ReportTitleNavigationCalendar.jsx
import React, { useState, useRef, useEffect } from "react";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useTranslation } from "react-i18next";

function ReportTitleNavigationCalendar({ onFilterChange }) {
  const { t } = useTranslation();

  // State management
  const [openFilter, setOpenFilter] = useState(false);
  const [dateFilter, setDateFilter] = useState({
    from: { year: "", month: "", day: "" },
    to: { year: "", month: "", day: "" },
  });
  const [inputValue, setInputValue] = useState("");

  // Refs for handling clicks outside
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  // Generate year, month, and day options
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1999 }, (_, i) => 2000 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        setOpenFilter(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Apply the date filter
  const applyFilter = () => {
    setOpenFilter(false);
    const { from, to } = dateFilter;

    // Helper function to construct date strings
    const constructDate = (date) => {
      const { year, month, day } = date;
      let dateString = "";
      if (year) {
        dateString += year;
        if (month) {
          dateString += `-${String(month).padStart(2, "0")}`;
          if (day) {
            dateString += `-${String(day).padStart(2, "0")}`;
          }
        }
      }
      return dateString;
    };

    const fromDate = constructDate(from);
    const toDate = constructDate(to);

    setInputValue(`${fromDate || ""} - ${toDate || ""}`);

    onFilterChange({ from: fromDate, to: toDate });
  };

  // Reset the date filter
  const resetFilter = () => {
    setDateFilter({
      from: { year: "", month: "", day: "" },
      to: { year: "", month: "", day: "" },
    });
    setInputValue("");
    onFilterChange({ from: "", to: "" });
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setOpenFilter((prev) => !prev);
  };

  // Determine if any filter is applied
  const isFilterApplied =
    dateFilter.from.year ||
    dateFilter.from.month ||
    dateFilter.from.day ||
    dateFilter.to.year ||
    dateFilter.to.month ||
    dateFilter.to.day;

  // Custom Dropdown Component within the same file
  const CustomDropdown = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownInnerRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          dropdownInnerRef.current &&
          !dropdownInnerRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleSelect = (option) => {
      onChange(option);
      setIsOpen(false);
    };

    return (
      <div className="relative w-full" ref={dropdownInnerRef}>
        <button
          type="button"
          className="w-full bg-white border border-gray-300 rounded px-3 py-1 flex justify-between items-center cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={value ? "text-gray-900" : "text-gray-500"}>
            {value || placeholder}
          </span>
          {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </button>
        {isOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <li
                key={option}
                className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                  option === value ? "bg-gray-200" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="flex justify-between items-center relative font-gilroy mb-5">
      <h1 className="text-2xl font-medium leading-8">{t("labels.report")}</h1>

      <div className="relative w-[27%] z-20">
        <div
          ref={triggerRef}
          className="flex items-center bg-bodyColor border border-inputBorder rounded-lg px-3 py-2 focus-within:border-inputRingFocus overflow-hidden hover:bg-inputBgHover cursor-pointer"
          onClick={toggleDropdown}
        >
          <IoCalendarClearOutline className="text-inputPlaceholderText size-5 flex-shrink-0" />
          <input
            type="text"
            placeholder={t("placeholders.search")}
            value={inputValue}
            readOnly
            onClick={(e) => {
              e.stopPropagation(); // Prevent the event from bubbling to the parent div
              toggleDropdown();
            }}
            className="ml-2 w-full text-inputRingFocus bg-bodyColor outline-none placeholder-inputPlaceholderText pl-2 hover:bg-inputBgHover cursor-pointer"
          />
          <MdKeyboardArrowDown
            className={`transition-transform duration-300 duration-300 size-6 text-gray-400 ${
              openFilter ? "transform rotate-180" : ""
            }`}
          />
        </div>
        {openFilter && (
          <div
            ref={dropdownRef}
            className="absolute mt-2 bg-white border rounded shadow-lg p-4 w-72 -ml-56 lg:-ml-0"
          >
            <div className="flex flex-col space-y-4">
              {/* From Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t("filters.startDate")}
                </label>
                <div className="flex space-x-2 mt-1">
                  <div className="w-1/3">
                    <CustomDropdown
                      options={years}
                      value={dateFilter.from.year}
                      onChange={(year) =>
                        setDateFilter((prev) => ({
                          ...prev,
                          from: {
                            ...prev.from,
                            year,
                          },
                        }))
                      }
                      placeholder="İl"
                    />
                  </div>
                  <div className="w-1/3">
                    <CustomDropdown
                      options={months}
                      value={dateFilter.from.month}
                      onChange={(month) =>
                        setDateFilter((prev) => ({
                          ...prev,
                          from: {
                            ...prev.from,
                            month,
                          },
                        }))
                      }
                      placeholder="Ay"
                    />
                  </div>
                  <div className="w-1/3">
                    <CustomDropdown
                      options={days}
                      value={dateFilter.from.day}
                      onChange={(day) =>
                        setDateFilter((prev) => ({
                          ...prev,
                          from: {
                            ...prev.from,
                            day,
                          },
                        }))
                      }
                      placeholder="Gün"
                    />
                  </div>
                </div>
              </div>
              {/* To Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t("filters.endDate")}
                </label>
                <div className="flex space-x-2 mt-1">
                  <div className="w-1/3">
                    <CustomDropdown
                      options={years}
                      value={dateFilter.to.year}
                      onChange={(year) =>
                        setDateFilter((prev) => ({
                          ...prev,
                          to: {
                            ...prev.to,
                            year,
                          },
                        }))
                      }
                      placeholder="İl"
                    />
                  </div>
                  <div className="w-1/3">
                    <CustomDropdown
                      options={months}
                      value={dateFilter.to.month}
                      onChange={(month) =>
                        setDateFilter((prev) => ({
                          ...prev,
                          to: {
                            ...prev.to,
                            month,
                          },
                        }))
                      }
                      placeholder="Ay"
                    />
                  </div>
                  <div className="w-1/3">
                    <CustomDropdown
                      options={days}
                      value={dateFilter.to.day}
                      onChange={(day) =>
                        setDateFilter((prev) => ({
                          ...prev,
                          to: {
                            ...prev.to,
                            day,
                          },
                        }))
                      }
                      placeholder="Gün"
                    />
                  </div>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="w-full flex gap-2">
                {/* Reset Button - Render only if a filter is applied */}
                {isFilterApplied && (
                  <button
                    className="mt-2 font-gilroy bg-buttonSecondaryDefault hover:bg-buttonSecondaryHover active:bg-buttonPressedSecondary text-buttonPrimaryDefault px-4 py-2 rounded w-full"
                    onClick={resetFilter}
                  >
                    {t("filters.resetFilters")}
                  </button>
                )}
                {/* Apply Button */}
                <button
                  className="mt-2 font-gilroy bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white px-4 py-2 rounded w-full"
                  onClick={applyFilter}
                >
                  {t("filters.apply")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportTitleNavigationCalendar;
