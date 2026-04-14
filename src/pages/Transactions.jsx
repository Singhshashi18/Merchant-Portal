import { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  Download,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ChevronUp,
  ListChecks,
  Trash2,
  X,
} from 'lucide-react';

const ticketRows = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: 'Anna Henisky',
  tableNo: 'Cell',
  paidCheckNo: '134242',
  date: '11/04/23',
  time: '8:43 PM',
  total: '$34.24',
}));

const liveTicketRows = [
  { id: 1, table: '13w4F2G2', date: '08/30/24', openedAt: '8:43 PM', closedAt: '9:54 PM', status: 'PAID', tip: '$5.23', amountDue: '$0.00', liveTable: 11 },
  { id: 2, table: '13w4F2G2', date: '08/30/24', openedAt: '8:43 PM', closedAt: '9:54 PM', status: 'PAID', tip: '$5.23', amountDue: '$0.00', liveTable: 32 },
  { id: 3, table: '13w4F2G2', date: '08/30/24', openedAt: '8:43 PM', closedAt: '-', status: 'PENDING', tip: '-', amountDue: '$34.24', liveTable: 12 },
  { id: 4, table: '13w4F2G2', date: '08/30/24', openedAt: '8:43 PM', closedAt: '9:54 PM', status: 'PAID', tip: '$5.23', amountDue: '$0.00', liveTable: 15 },
  { id: 5, table: '13w4F2G2', date: '08/30/24', openedAt: '8:43 PM', closedAt: '-', status: 'PENDING', tip: '-', amountDue: '$34.24', liveTable: 42 },
  { id: 6, table: '13w4F2G2', date: '08/30/24', openedAt: '8:43 PM', closedAt: '-', status: 'PENDING', tip: '-', amountDue: '$34.24', liveTable: 55 },
  { id: 7, table: '13w4F2G2', date: '08/30/24', openedAt: '8:43 PM', closedAt: '9:54 PM', status: 'PAID', tip: '$5.23', amountDue: '$0.00', liveTable: 21 },
  { id: 8, table: '13w4F2G2', date: '08/30/24', openedAt: '8:43 PM', closedAt: '9:54 PM', status: 'PAID', tip: '$5.23', amountDue: '$0.00', liveTable: 11 },
];

export default function Transactions() {
  const [isLiveTickets, setIsLiveTickets] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeDateField, setActiveDateField] = useState('to');
  const [fromDate, setFromDate] = useState(new Date(2023, 10, 11));
  const [toDate, setToDate] = useState(new Date(2023, 10, 11));
  const [calendarMonth, setCalendarMonth] = useState(new Date(2021, 11, 1));
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
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

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  };

  const formatMonthYear = (date) => {
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  };

  const isSameDay = (a, b) => {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  };

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
    const baseDate = field === 'from' ? fromDate : toDate;
    setCalendarMonth(new Date(baseDate.getFullYear(), baseDate.getMonth(), 1));
    setIsCalendarOpen(true);
  };

  const handleDaySelect = (date) => {
    if (activeDateField === 'from') {
      setFromDate(date);
      setActiveDateField('to');
      setCalendarMonth(new Date(toDate.getFullYear(), toDate.getMonth(), 1));
      return;
    }

    setToDate(date);
    setIsCalendarOpen(false);
  };

  const calendarDays = buildCalendarDays(calendarMonth);

  return (
    <div className="dashboard">
      <div className="content page-content">
        <div className="tickets-shell">
          <div className="tickets-topbar">
            <h1 className="tickets-title">Tickets</h1>

            <div className="tickets-actions">
              <label className="toggle-wrap">
                <input
                  type="checkbox"
                  checked={isLiveTickets}
                  onChange={(e) => setIsLiveTickets(e.target.checked)}
                />
                <span className="toggle-slider" />
                <span className="toggle-label">Live Tickets</span>
              </label>

              <button className="export-btn" type="button" onClick={() => setIsExportModalOpen(true)}>
                <Download size={14} />
                Export Transactions Report
              </button>
            </div>
          </div>

          <div className="tickets-card">
            <div className="tickets-filters">
              <div className="filter-select">
                <span>Search By</span>
                <select className="fake-select-value" defaultValue="Check #">
                  <option>Check #</option>
                  <option>Table #</option>
                </select>
              </div>

              <div className="filter-search">
                <Search size={16} />
                <input type="text" placeholder="Search check #" />
              </div>

              {!isLiveTickets && (
                <label className="toggle-wrap refunded-toggle">
                  <input type="checkbox" />
                  <span className="toggle-slider" />
                  <span className="toggle-label">Refunded</span>
                </label>
              )}

              <div className="tickets-date-range-wrap" ref={calendarRef}>
                <div
                  className={`date-input-group date-picker-trigger${activeDateField === 'from' ? ' active' : ''}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleOpenCalendar('from')}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      handleOpenCalendar('from');
                    }
                  }}
                >
                  <span>From</span>
                  <input type="text" value={isLiveTickets ? `7:45 PM ${formatDate(fromDate)}` : formatDate(fromDate)} readOnly />
                </div>

                <div
                  className={`date-input-group date-picker-trigger${activeDateField === 'to' ? ' active' : ''}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleOpenCalendar('to')}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      handleOpenCalendar('to');
                    }
                  }}
                >
                  <span>To</span>
                  <input type="text" value={isLiveTickets ? `8:45 PM ${formatDate(toDate)}` : formatDate(toDate)} readOnly />
                </div>

                {isCalendarOpen && (
                  <div className={`tickets-calendar-popover ${activeDateField === 'from' ? 'from' : 'to'}`} role="dialog" aria-label="Date picker">
                  <div className="tickets-calendar-head">
                      <span>{formatMonthYear(calendarMonth)}</span>
                    <div className="tickets-calendar-actions">
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

                  <div className="tickets-calendar-weekdays">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                      <span key={`${day}-${index}`}>{day}</span>
                    ))}
                  </div>

                  <div className="tickets-calendar-grid">
                    {calendarDays.map((dayDate, index) => (
                      <button
                        type="button"
                        key={`${dayDate ? dayDate.toISOString() : 'empty'}-${index}`}
                        className={`tickets-calendar-day${dayDate && isSameDay(dayDate, activeDateField === 'from' ? fromDate : toDate) ? ' selected' : ''}${!dayDate ? ' empty' : ''}`}
                        disabled={!dayDate}
                        onClick={() => dayDate && handleDaySelect(dayDate)}
                      >
                        {dayDate ? dayDate.getDate() : ''}
                      </button>
                    ))}
                  </div>
                  </div>
                )}
              </div>
            </div>

            {!isLiveTickets ? (
              <table className="tickets-table">
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>TABLE #</th>
                    <th>PAID CHECK #</th>
                    <th>DATE</th>
                    <th>TIME</th>
                    <th>TOTAL</th>
                    <th>DETAILS</th>
                  </tr>
                </thead>

                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.name}</td>
                      <td>{row.tableNo}</td>
                      <td>{row.paidCheckNo}</td>
                      <td>{row.date}</td>
                      <td>{row.time}</td>
                      <td>{row.total}</td>
                      <td>
                        <button className="details-btn" type="button" onClick={() => setSelectedTicket(row)}>
                          <SlidersHorizontal size={14} />
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="tickets-table tickets-table-live">
                <thead>
                  <tr>
                    <th>TABLE #</th>
                    <th>DATE</th>
                    <th>OPENED AT</th>
                    <th>CLOSED AT</th>
                    <th>PAID STATUS</th>
                    <th>TIP</th>
                    <th>AMOUNT DUE</th>
                    <th>LIVE TABLE</th>
                  </tr>
                </thead>

                <tbody>
                  {liveTicketRows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.table}</td>
                      <td>{row.date}</td>
                      <td>{row.openedAt}</td>
                      <td>{row.closedAt}</td>
                      <td>
                        <span className={`status-pill ${row.status === 'PAID' ? 'paid' : 'pending'}`}>
                          {row.status}
                        </span>
                      </td>
                      <td>{row.tip}</td>
                      <td>{row.amountDue}</td>
                      <td>
                        <button className="live-table-pill" type="button">
                          {row.liveTable}
                          <ExternalLink size={11} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="tickets-footer">
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
        </div>

        {isExportModalOpen && (
          <div className="tickets-report-overlay" role="presentation" onClick={() => setIsExportModalOpen(false)}>
            <section
              className="tickets-report-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Download Report"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="tickets-report-head">
                <h2>Download Report</h2>
                <button type="button" className="tickets-report-close" onClick={() => setIsExportModalOpen(false)}>
                  <X size={18} />
                </button>
              </header>

              <div className="tickets-report-body">
                <p>This report is a CSV document containing transaction information for the following dates.</p>

                <div className="tickets-report-range">
                  <div className="tickets-report-box">
                    <span>FROM</span>
                    <strong>09/12/23</strong>
                  </div>

                  <div className="tickets-report-box">
                    <span>TO</span>
                    <strong>09/12/23</strong>
                  </div>
                </div>

                <button type="button" className="tickets-report-download-btn" onClick={() => setIsExportModalOpen(false)}>
                  Download Report
                </button>
              </div>
            </section>
          </div>
        )}

        {selectedTicket && (
          <div className="tickets-details-overlay" role="presentation" onClick={() => setSelectedTicket(null)}>
            <section
              className="tickets-details-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Transaction Details"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="tickets-details-head">
                <h2>Transaction Details</h2>

                <div className="tickets-details-actions">
                  <button type="button" className="tickets-details-ghost-btn" onClick={() => setIsResendModalOpen(true)}>
                    <ListChecks size={14} />
                    Resend Receipt
                  </button>
                  <button type="button" className="tickets-details-ghost-btn" onClick={() => setIsRefundModalOpen(true)}>
                    <Trash2 size={14} />
                    Refund
                  </button>
                  <button
                    type="button"
                    className="tickets-details-close"
                    onClick={() => {
                      setSelectedTicket(null);
                      setIsResendModalOpen(false);
                      setIsRefundModalOpen(false);
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
              </header>

              <div className="tickets-details-body">
                <div className="tickets-details-card tickets-details-items">
                  <div className="tickets-details-table-head">
                    <span>QUANTITY</span>
                    <span>ITEM</span>
                    <span>MODS</span>
                    <span>PRICE</span>
                  </div>

                  <div className="tickets-details-table-row">
                    <span>1</span>
                    <span>_COKE ZERO</span>
                    <span>7</span>
                    <span>$23.99</span>
                  </div>
                  <div className="tickets-details-table-row">
                    <span>1</span>
                    <span>STELLA AR SC</span>
                    <span>8</span>
                    <span>$95.00</span>
                  </div>
                  <div className="tickets-details-table-row">
                    <span>1</span>
                    <span>GREEN TEA</span>
                    <span>Schooner</span>
                    <span>$155.00</span>
                  </div>
                  <div className="tickets-details-table-row">
                    <span>1</span>
                    <span>_Boneless Wng12</span>
                    <span>Celery, Add Extra Sauce</span>
                    <span>$17.99</span>
                  </div>
                </div>

                <div className="tickets-details-card tickets-details-summary">
                  <div className="tickets-details-summary-row">
                    <span>SubTotal</span>
                    <span>$5.70</span>
                  </div>
                  <div className="tickets-details-summary-row">
                    <span>Tax</span>
                    <span>$5.00</span>
                  </div>
                  <div className="tickets-details-summary-row">
                    <span>Tip</span>
                    <span>$3.67</span>
                  </div>
                  <div className="tickets-details-summary-row total">
                    <span>Total</span>
                    <strong>$79.83</strong>
                  </div>
                </div>
              </div>

              {isResendModalOpen && (
                <div className="tickets-inline-overlay" role="presentation" onClick={() => setIsResendModalOpen(false)}>
                  <section
                    className="tickets-inline-modal tickets-resend-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Resend Receipt"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <header className="tickets-inline-head">
                      <h3>Resend Receipt</h3>
                      <button type="button" className="tickets-inline-close" onClick={() => setIsResendModalOpen(false)}>
                        <X size={18} />
                      </button>
                    </header>

                    <p className="tickets-inline-text">
                      Please confirm the the guest email address you wish to resend the transaction receipt to.
                    </p>

                    <label className="tickets-inline-field">
                      <span>Guest Email Address</span>
                      <input type="text" value="hotmail123@gmail.com" readOnly />
                    </label>

                    <button type="button" className="tickets-inline-submit" onClick={() => setIsResendModalOpen(false)}>
                      Resend Receipt
                    </button>
                  </section>
                </div>
              )}

              {isRefundModalOpen && (
                <div className="tickets-inline-overlay" role="presentation" onClick={() => setIsRefundModalOpen(false)}>
                  <section
                    className="tickets-inline-modal tickets-refund-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Refund Transaction"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <header className="tickets-inline-head">
                      <h3>Refund Transaction</h3>
                      <button type="button" className="tickets-inline-close" onClick={() => setIsRefundModalOpen(false)}>
                        <X size={18} />
                      </button>
                    </header>

                    <div className="tickets-refund-amount">
                      <strong>$ 82.12</strong>
                      <span>TOTAL REFUNDABLE AMOUNT</span>
                    </div>

                    <p className="tickets-inline-text tickets-refund-text">
                      Please enter a refund amount equal to or less than the total amount refundable.
                    </p>

                    <label className="tickets-inline-field">
                      <span>Refund Amount</span>
                      <input type="text" value="$   49.89" readOnly />
                    </label>

                    <label className="tickets-inline-field">
                      <span>Reason for refund</span>
                      <input type="text" value="Enter the reason for a refund" readOnly />
                    </label>

                    <button type="button" className="tickets-inline-submit" onClick={() => setIsRefundModalOpen(false)}>
                      Process Refund
                    </button>
                  </section>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}