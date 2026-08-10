import { useEffect, useRef, useState } from "react";
import {
  Search,
  Pencil,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const invoices = [
  { id: "00123", status: "CLOSED", subtotal: "$12.23", total: "$15.23", periodEnding: "12/12/23" },
  { id: "00123", status: "CLOSED", subtotal: "$12.23", total: "$15.23", periodEnding: "12/12/23" },
  { id: "00123", status: "FAILED", subtotal: "$12.23", total: "$15.23", periodEnding: "12/12/23" },
  { id: "00123", status: "CLOSED", subtotal: "$12.23", total: "$15.23", periodEnding: "12/12/23" },
  { id: "00123", status: "CLOSED", subtotal: "$12.23", total: "$15.23", periodEnding: "12/12/23" },
  { id: "00123", status: "CLOSED", subtotal: "$12.23", total: "$15.23", periodEnding: "12/12/23" },
  { id: "00123", status: "CLOSED", subtotal: "$12.23", total: "$15.23", periodEnding: "12/12/23" },
];

export default function Billing() {
  const [isBillingMethodOpen, setIsBillingMethodOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeDateField, setActiveDateField] = useState("to");
  const [fromDate, setFromDate] = useState(new Date(2023, 10, 11));
  const [toDate, setToDate] = useState(new Date(2023, 10, 11));
  const [calendarMonth, setCalendarMonth] = useState(new Date(2021, 11, 1));
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!calendarRef.current) {
        return;
      }

      if (!calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  };

  const formatMonthYear = (date) => {
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  };

  const isSameDay = (a, b) => {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  };
//Builds an array of dates to fill the calendar
  const buildCalendarDays = (monthDate) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];

    for (let i = 0; i < firstDayIndex; i += 1) {
      cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(year, month, day));
    }

    return cells;
  };

  const handleOpenCalendar = (field) => {
    if (activeDateField === field && isCalendarOpen) {
      setIsCalendarOpen(false);
      return;
    }

    setActiveDateField(field);
    const baseDate = field === "from" ? fromDate : toDate;
    setCalendarMonth(new Date(baseDate.getFullYear(), baseDate.getMonth(), 1));
    setIsCalendarOpen(true);
  };

  const handleDaySelect = (date) => {
    if (activeDateField === "from") {
      setFromDate(date);
      setActiveDateField("to");
      setCalendarMonth(new Date(toDate.getFullYear(), toDate.getMonth(), 1));
      return;
    }

    setToDate(date);
    setIsCalendarOpen(false);
  };

  const calendarDays = buildCalendarDays(calendarMonth);

  return (
    <div className="dashboard billing-page">
      <div className="content page-content">
        <div className="billing-head">
          <div>
            <h1 className="title">Billing</h1>
            <p>
              The analytics displayed on this dashboard page are compared to the corresponding time range prior to the
              applied time range for context and comparison.
            </p>
          </div>

          <button type="button" className="billing-method-btn" onClick={() => setIsBillingMethodOpen(true)}>
            <Pencil size={14} />
            View/Update Billing Method
          </button>
        </div>

        <div className="billing-card">
          <div className="billing-filters">
            <div className="billing-search">
              <Search size={18} />
              <input type="text" placeholder="Search by invoice number" />
            </div>

            <div className="billing-date-range-wrap" ref={calendarRef}>
              <div
                className={`billing-date billing-date-trigger${activeDateField === "from" ? " active" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => handleOpenCalendar("from")}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    handleOpenCalendar("from");
                  }
                }}
              >
                <span>From</span>
                <input type="text" value={formatDate(fromDate)} readOnly />
              </div>

              <div
                className={`billing-date billing-date-trigger${activeDateField === "to" ? " active" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => handleOpenCalendar("to")}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    handleOpenCalendar("to");
                  }
                }}
              >
                <span>To</span>
                <input type="text" value={formatDate(toDate)} readOnly />
              </div>

              {isCalendarOpen && (
                <div className={`billing-calendar-popover ${activeDateField === "from" ? "from" : "to"}`} role="dialog" aria-label="Date picker">
                  <div className="billing-calendar-head">
                    <span>{formatMonthYear(calendarMonth)}</span>
                    <div className="billing-calendar-nav">
                      <button
                        type="button"
                        aria-label="Previous month"
                        onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label="Next month"
                        onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="billing-calendar-weekdays">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                      <span key={`${day}-${index}`}>{day}</span>
                    ))}
                  </div>

                  <div className="billing-calendar-grid">
                    {calendarDays.map((dayDate, index) => (
                      <button
                        type="button"
                        key={`${dayDate ? dayDate.toISOString() : "empty"}-${index}`}
                        className={`billing-calendar-day${dayDate && isSameDay(dayDate, activeDateField === "from" ? fromDate : toDate) ? " selected" : ""}${!dayDate ? " empty" : ""}`}
                        disabled={!dayDate}
                        onClick={() => dayDate && handleDaySelect(dayDate)}
                      >
                        {dayDate ? dayDate.getDate() : ""}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <table className="billing-table">
            <thead>
              <tr>
                <th>INVOICE #</th>
                <th>STATUS</th>
                <th>SUBTOTAL</th>
                <th>TOTAL</th>
                <th>PERIOD ENDING</th>
                <th>PDF INVOICE DOWNLOAD</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={`${invoice.id}-${index}`}>
                  <td>{invoice.id}</td>
                  <td>
                    <span className={`invoice-status ${invoice.status === "CLOSED" ? "closed" : "failed"}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td>{invoice.subtotal}</td>
                  <td>{invoice.total}</td>
                  <td>{invoice.periodEnding}</td>
                  <td>
                    <button type="button" className="invoice-download-btn">
                      <Download size={13} />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="billing-footer">
            <div className="rows-per-page">
              Rows per page:
              <button type="button">
                10
                <ChevronDown size={14} />
              </button>
            </div>

            <div className="footer-nav">
              <span>1-5 of 13</span>
              <button type="button" aria-label="Previous page">
                <ChevronLeft size={16} />
              </button>
              <button type="button" aria-label="Next page">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {isBillingMethodOpen && (
          <div className="billing-modal-overlay" role="dialog" aria-modal="true" aria-label="Billing Method">
            <div className="billing-modal">
              <div className="billing-modal-header">
                <h2>Billing Method</h2>
                <button type="button" className="billing-modal-close" onClick={() => setIsBillingMethodOpen(false)}>
                  <X size={16} />
                </button>
              </div>

              <div className="billing-modal-body">
                <div className="billing-method-form">
                  <label className="method-field span-2">
                    <span>Account Name</span>
                    <input type="text" value="" readOnly />
                  </label>

                  <label className="method-field with-icon">
                    <span>Routing Number</span>
                    <input type="text" value="*****0606" readOnly />
                    <Pencil size={14} />
                  </label>

                  <label className="method-field with-icon">
                    <span>Account Number</span>
                    <input type="text" value="*****0606" readOnly />
                    <Pencil size={14} />
                  </label>

                  <label className="method-field with-icon">
                    <span>Account Type</span>
                    <input type="text" value="Checking" readOnly />
                    <ChevronDown size={14} />
                  </label>

                  <label className="method-field with-icon">
                    <span>Account Holder Type</span>
                    <input type="text" value="Business" readOnly />
                    <ChevronDown size={14} />
                  </label>

                  <label className="method-field span-2">
                    <span>Business Address Street</span>
                    <input type="text" value="123 Address Ave" readOnly />
                  </label>

                  <label className="method-field">
                    <span>Business Address City</span>
                    <input type="text" value="Reading" readOnly />
                  </label>

                  <label className="method-field">
                    <span>Business Address State</span>
                    <input type="text" value="PA" readOnly />
                  </label>

                  <label className="method-field">
                    <span>Business Address Zip Code</span>
                    <input type="text" value="91723" readOnly />
                  </label>

                  <label className="method-field">
                    <span>Billing Contact First Name</span>
                    <input type="text" value="Joe" readOnly />
                  </label>

                  <label className="method-field">
                    <span>Billing Contact Last Name</span>
                    <input type="text" value="Gold" readOnly />
                  </label>

                  <label className="method-field span-2">
                    <span>Billing Email Address</span>
                    <input type="text" value="dummyuser@.com" readOnly />
                  </label>
                </div>
              </div>

              <div className="billing-modal-footer">
                <button type="button" className="billing-save-btn" onClick={() => setIsBillingMethodOpen(false)}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
