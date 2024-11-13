import React, { useState, useRef, useEffect } from "react";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
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
  const dropdownRef = useRef(null);

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

  // Reference to the trigger element (input and icons)
  const triggerRef = useRef(null);

  // Apply the date filter
  const applyFilter = () => {
    setOpenFilter(false);
    const { from, to } = dateFilter;
    const fromDate =
      from.year && from.month && from.day
        ? new Date(from.year, from.month - 1, from.day)
        : null;
    const toDate =
      to.year && to.month && to.day
        ? new Date(to.year, to.month - 1, to.day)
        : null;
    const displayFrom =
      from.year || from.month || from.day
        ? `${from.year}-${String(from.month).padStart(2, "0")}-${String(
            from.day
          ).padStart(2, "0")}`
        : "";
    const displayTo =
      to.year || to.month || to.day
        ? `${to.year}-${String(to.month).padStart(2, "0")}-${String(
            to.day
          ).padStart(2, "0")}`
        : "";
    setInputValue(`${displayFrom} - ${displayTo}`);

    onFilterChange({ from: fromDate, to: toDate });
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setOpenFilter((prev) => !prev);
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
            className={`transition-transform duration-300 size-6 text-gray-400 ${
              openFilter ? "transform rotate-180" : ""
            }`}
          />
        </div>
        {openFilter && (
          <div
            ref={dropdownRef}
            className="absolute mt-2 bg-white border rounded shadow-lg p-4 w-72"
          >
            <div className="flex flex-col space-y-4">
              {/* From Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t("filters.startDate")}
                </label>
                <div className="flex space-x-2 mt-1">
                  <select
                    value={dateFilter.from.year}
                    onChange={(e) =>
                      setDateFilter((prev) => ({
                        ...prev,
                        from: {
                          ...prev.from,
                          year: e.target.value,
                        },
                      }))
                    }
                    className="border rounded px-2 py-1 w-1/3"
                  >
                    <option value="">İl</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <select
                    value={dateFilter.from.month}
                    onChange={(e) =>
                      setDateFilter((prev) => ({
                        ...prev,
                        from: {
                          ...prev.from,
                          month: e.target.value,
                        },
                      }))
                    }
                    className="border rounded px-2 py-1 w-1/3"
                  >
                    <option value="">Ay</option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    value={dateFilter.from.day}
                    onChange={(e) =>
                      setDateFilter((prev) => ({
                        ...prev,
                        from: {
                          ...prev.from,
                          day: e.target.value,
                        },
                      }))
                    }
                    className="border rounded px-2 py-1 w-1/3"
                  >
                    <option value="">Gün</option>
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* To Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t("filters.endDate")}
                </label>
                <div className="flex space-x-2 mt-1">
                  <select
                    value={dateFilter.to.year}
                    onChange={(e) =>
                      setDateFilter((prev) => ({
                        ...prev,
                        to: {
                          ...prev.to,
                          year: e.target.value,
                        },
                      }))
                    }
                    className="border rounded px-2 py-1 w-1/3"
                  >
                    <option value="">İl</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <select
                    value={dateFilter.to.month}
                    onChange={(e) =>
                      setDateFilter((prev) => ({
                        ...prev,
                        to: {
                          ...prev.to,
                          month: e.target.value,
                        },
                      }))
                    }
                    className="border rounded px-2 py-1 w-1/3"
                  >
                    <option value="">Ay</option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    value={dateFilter.to.day}
                    onChange={(e) =>
                      setDateFilter((prev) => ({
                        ...prev,
                        to: {
                          ...prev.to,
                          day: e.target.value,
                        },
                      }))
                    }
                    className="border rounded px-2 py-1 w-1/3"
                  >
                    <option value="">Gün</option>
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                className="mt-2 font-gilroy bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white px-4 py-2 rounded w-full"
                onClick={applyFilter}
              >
                {t("filters.apply")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportTitleNavigationCalendar;
