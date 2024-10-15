import React, { useState, useRef, useEffect } from "react";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";

function ReportTitleNavigationCalendar() {
  const [openFilter, setOpenFilter] = useState(false);
  const [dateFilter, setDateFilter] = useState({
    from: { year: "", month: "", day: "" },
    to: { year: "", month: "", day: "" },
  });
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef(null);

  const years = Array.from(
    { length: new Date().getFullYear() - 1999 },
    (_, i) => 2000 + i
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenFilter(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="flex justify-between items-center relative font-gilroy mb-5">
      <h1 className="text-2xl font-medium leading-8">Hesabat</h1>

      <div className="relative w-[24%]">
        <div
          className="flex items-center bg-bodyColor border border-inputBorder rounded-lg px-3 py-2 focus-within:border-inputRingFocus overflow-hidden hover:bg-inputBgHover"
          onClick={() => setOpenFilter(!openFilter)}
        >
          <IoCalendarClearOutline className="text-inputPlaceholderText size-5 flex-shrink-0" />
          <input
            type="text"
            placeholder="Axtar"
            value={inputValue}
            readOnly
            className="ml-2 w-full text-inputRingFocus bg-bodyColor outline-none placeholder-inputPlaceholderText pl-2 hover:bg-inputBgHover "
          />
          <MdKeyboardArrowDown />
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
                  Başlanğıc Tarix
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
                  Son Tarix
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
                onClick={() => {
                  // Apply the date filter
                  setOpenFilter(false);
                  // Format the dates
                  const from = dateFilter.from;
                  const to = dateFilter.to;
                  const fromDate = `${from.year || ""}-${from.month || ""}-${
                    from.day || ""
                  }`;
                  const toDate = `${to.year || ""}-${to.month || ""}-${
                    to.day || ""
                  }`;
                  // Set the input value
                  setInputValue(`${fromDate} - ${toDate}`);
                }}
              >
                Tətbiq et
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportTitleNavigationCalendar;
