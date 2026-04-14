import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Pencil, Search, Upload, X } from "lucide-react";

const days = [
  { label: "TUE", date: "17", active: true },
  { label: "WED", date: "18" },
  { label: "THU", date: "19" },
  { label: "FRI", date: "20" },
  { label: "SAT", date: "21", weekend: true },
  { label: "SUN", date: "22", weekend: true },
  { label: "MON", date: "23" },
  { label: "TUE", date: "24" },
];

const rows = [
  { name: "Fran Perez", id: "df45er" },
  { name: "Jie Yan Song", id: "fh45sg" },
  { name: "Anika Visser", id: "kw54fd" },
  { name: "Miron Vitoid", id: "kr45mq" },
  { name: "Brian Hermoza", id: "lf48ah" },
  { name: "Brian Hermoza", id: "tk54he" },
  { name: "Brian Hermoza", id: "ls96sj" },
];

export default function Terminals() {
  const [selectedRow, setSelectedRow] = useState(null);

  const openAllocationModal = (row) => {
    setSelectedRow(row);
  };

  const closeAllocationModal = () => {
    setSelectedRow(null);
  };

  return (
    <div className="dashboard terminals-page tip-control-page">
      <div className="content page-content">
        <h1 className="tipc-title">Tip Control</h1>

        <div className="tipc-toolbar">
          <button type="button" className="tipc-week-pill">
            <span>Week of</span>
            <strong>04/17/25</strong>
            <ChevronDown size={14} />
          </button>

          <button type="button" className="tipc-nav-btn" aria-label="Previous day">
            <ChevronLeft size={16} />
          </button>

          <div className="tipc-days">
            {days.map((day) => (
              <button
                type="button"
                key={`${day.label}-${day.date}`}
                className={`tipc-day${day.active ? " active" : ""}${day.weekend ? " weekend" : ""}`}
              >
                <span>{day.label}</span>
                <strong>{day.date}</strong>
              </button>
            ))}
          </div>

          <button type="button" className="tipc-import-btn">
            <Upload size={14} />
            Import Tip Schedule
          </button>
        </div>

        <section className="tipc-card" aria-label="Tip control table">
          <div className="tipc-filters">
            <label className="tipc-search-wrap" aria-label="Search">
              <Search size={14} />
              <input type="text" placeholder="Placeholder" />
            </label>

            <button type="button" className="tipc-filter-select" aria-label="Filter">
              <span>Search By</span>
              <strong>Table Number</strong>
              <ChevronDown size={14} />
            </button>
          </div>

          <div className="tipc-table-wrap">
            <table className="tipc-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>ID</th>
                  <th>TABLES</th>
                  <th>SHIFT TIME</th>
                  <th>EDIT</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="tipc-row-clickable" onClick={() => openAllocationModal(row)}>
                    <td>{row.name}</td>
                    <td>{row.id}</td>
                    <td>3,5,6,7,8,9,11</td>
                    <td>8:00 am - 3:30 pm</td>
                    <td>
                      <button type="button" className="tipc-edit-btn" aria-label="Edit row">
                        <Pencil size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="tipc-pagination">
            <span>Rows per page:</span>
            <button type="button" className="tipc-page-size">
              10
              <ChevronDown size={13} />
            </button>
            <span>1-5 of 13</span>
            <button type="button" className="tipc-page-arrow" aria-label="Previous page">
              <ChevronLeft size={15} />
            </button>
            <button type="button" className="tipc-page-arrow" aria-label="Next page">
              <ChevronRight size={15} />
            </button>
          </div>
        </section>

        {selectedRow && (
          <div
            className="tipc-modal-overlay"
            role="presentation"
            onClick={closeAllocationModal}
          >
            <section
              className="tipc-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Edit Staff Tip Allocation"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="tipc-modal-head">
                <h2>Edit Staff Tip Allocation</h2>
                <button type="button" className="tipc-modal-close" onClick={closeAllocationModal}>
                  <X size={18} />
                </button>
              </header>

              <div className="tipc-modal-body">
                <div className="tipc-modal-form-wrap">
                  <div className="tipc-modal-grid">
                    <label className="tipc-modal-field">
                      <span>Name</span>
                      <input type="text" value={selectedRow.name} readOnly />
                    </label>

                    <label className="tipc-modal-field">
                      <span>Staff IC</span>
                      <input type="text" value={selectedRow.id} readOnly />
                    </label>

                    <label className="tipc-modal-field">
                      <span>Start Time</span>
                      <input type="text" value="08:00 am" readOnly />
                    </label>

                    <label className="tipc-modal-field">
                      <span>End Time</span>
                      <input type="text" value="03:30 pm" readOnly />
                    </label>
                  </div>

                  <div className="tipc-modal-tables-row">
                    <label className="tipc-modal-field tipc-modal-field-add">
                      <span>Add Tables</span>
                      <input type="text" value="" readOnly placeholder="" />
                    </label>
                    <button type="button" className="tipc-modal-add-btn" aria-label="Add table">
                      +
                    </button>
                  </div>

                  <div className="tipc-modal-chips" aria-label="Assigned tables">
                    {[2, 3, 4, 5, 6].map((tableNo) => (
                      <span key={tableNo} className="tipc-modal-chip">
                        {tableNo}
                        <button type="button" aria-label={`Remove table ${tableNo}`}>
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <footer className="tipc-modal-foot">
                <button type="button" className="tipc-modal-save" onClick={closeAllocationModal}>
                  Save
                </button>
              </footer>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
