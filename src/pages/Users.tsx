import send from '../assets/images/send.png';
import { Pencil, SearchIcon, ChevronDown, ChevronUp, X, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const users = [
  { role: "ADMIN", status: "ACCEPTED" },
  { role: "MANAGER", status: "ACCEPTED" },
  { role: "MANAGER", status: "PENDING" },
  { role: "ADMIN", status: "ACCEPTED" },
];

const searchByOptions = ["Name", "Email", "Role", "Status"];

export default function Users() {
  const [searchBy, setSearchBy] = useState("Role");
  const [isSearchByOpen, setIsSearchByOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditAccessModalOpen, setIsEditAccessModalOpen] = useState(false);
  const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] = useState(false);
  const searchByRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!searchByRef.current) {
        return;
      }

      const target = event.target as Node;
      if (!searchByRef.current.contains(target)) {
        setIsSearchByOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="dashboard users-page">
      <div className="content page-content">
        <h1 className="title">Users</h1>

        <div className="users-header">
          <div className="left">
            <div className="search-by-wrap" ref={searchByRef}>
              <button
                type="button"
                className="search-by-field"
                onClick={() => setIsSearchByOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isSearchByOpen}
              >
                <span>Search By</span>
                <strong>
                  {searchBy}
                  <ChevronDown size={14} />
                </strong>
              </button>

              {isSearchByOpen && (
                <div className="search-by-dropdown" role="listbox" aria-label="Search by filter">
                  {searchByOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`search-by-option${searchBy === option ? " active" : ""}`}
                      onClick={() => {
                        setSearchBy(option);
                        setIsSearchByOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="search-box">
              <SearchIcon className="search-icon" />
              <input
                className="search-input"
                type="text"
                placeholder="Search Users"
              />
            </div>


          </div>

          <button type="button" className="users-send-invite-btn" onClick={() => setIsInviteModalOpen(true)}>
            <img src={send} alt="Send New Invite" />
          </button>
        </div>

        {/* Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>NAME</th>
                <th>ROLE</th>
                <th>LOCATION COUNT</th>
                <th>STATUS</th>
                <th>EDIT ACCESS</th>
              </tr>
            </thead>

            <tbody>
  {users.map((user, i) => (
    <tr key={i}>
      <td>
        <div className="user-info">
          <p className="name">Anna Henisky</p>
          <span>contact@anahenisky.io</span>
        </div>
      </td>

      <td>
        <span
          className={`badge ${
            user.role === "ADMIN" ? "admin" : "manager"
          }`}
        >
          {user.role}
        </span>
      </td>

      <td>11</td>

      <td>
        <span
          className={`badge ${
            user.status === "ACCEPTED" ? "accepted" : "pending"
          }`}
        >
          {user.status}
        </span>
      </td>

      <td>
        <button type="button" className="edit-btn" onClick={() => setIsEditAccessModalOpen(true)}>
          <Pencil size={14} />
          Edit
        </button>
      </td>
    </tr>
  ))}
</tbody>
          </table>



         <div className="table-footer">
  
  <div className="rows">
    <span>Rows per page:</span>

    <select>
      <option>10</option>
      <option>20</option>
      <option>50</option>
    </select>
  </div>

  <div className="pagination-info">
    <span>1-5 of 13</span>

    <div className="arrows">
      <button>{"<"}</button>
      <button>{">"}</button>
    </div>
  </div>

</div>
        </div>

        {isInviteModalOpen && (
          <div className="users-invite-overlay" role="presentation" onClick={() => setIsInviteModalOpen(false)}>
            <section
              className="users-invite-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Send New Invite"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="users-invite-head">
                <h2>Send New Invite</h2>
                <button type="button" className="users-invite-close" onClick={() => setIsInviteModalOpen(false)}>
                  <X size={20} />
                </button>
              </header>

              <div className="users-invite-body">
                <div className="users-invite-panel">
                  <div className="users-invite-grid">
                    <label className="users-invite-field">
                      <span>Full Name*</span>
                      <input type="text" value="Miron Vitold" readOnly />
                    </label>

                    <label className="users-invite-field users-invite-role-field">
                      <span>Role</span>
                      <div className="users-invite-role-value">
                        Manager
                        <ChevronDown size={14} />
                      </div>
                    </label>
                  </div>

                  <label className="users-invite-field users-invite-email-field">
                    <span>Email</span>
                    <input type="text" value="miron.vitold@devias.io" readOnly />
                  </label>

                  <p className="users-invite-subtitle">Select locations this user will have access to</p>

                  <div className="users-invite-location-card">
                    <div className="users-invite-location-row users-invite-location-row-head">
                      <div className="users-invite-location-left">
                        <span className="users-invite-checkbox" />
                        <strong>State</strong>
                      </div>
                      <div className="users-invite-location-right">
                        <span># of locations</span>
                        <ChevronUp size={15} />
                      </div>
                    </div>

                    <div className="users-invite-location-list">
                      {["Location Name", "Location Name", "Location Name", "Location Name"].map((location, index) => (
                        <div key={`${location}-${index}`} className="users-invite-location-row users-invite-location-subrow">
                          <div className="users-invite-location-left">
                            <span className={`users-invite-checkbox${index < 2 ? " checked" : ""}`}>
                              {index < 2 && <Check size={11} />}
                            </span>
                            <span>{location}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="users-invite-location-row">
                      <div className="users-invite-location-left">
                        <span className="users-invite-checkbox checked">
                          <Check size={11} />
                        </span>
                        <strong>Texas</strong>
                      </div>
                      <div className="users-invite-location-right">
                        <span>10 locations</span>
                        <ChevronDown size={15} />
                      </div>
                    </div>

                    <div className="users-invite-location-row">
                      <div className="users-invite-location-left">
                        <span className="users-invite-checkbox" />
                        <strong>Florida</strong>
                      </div>
                      <div className="users-invite-location-right">
                        <span>3 Locations</span>
                        <ChevronDown size={15} />
                      </div>
                    </div>
                  </div>

                  <p className="users-invite-selected-count">12 Locations selected</p>
                </div>
              </div>

              <footer className="users-invite-foot">
                <button type="button" className="users-invite-submit" onClick={() => setIsInviteModalOpen(false)}>
                  Send New Invite
                </button>
              </footer>
            </section>
          </div>
        )}

        {isEditAccessModalOpen && (
          <div className="users-edit-overlay" role="presentation" onClick={() => setIsEditAccessModalOpen(false)}>
            <section
              className="users-edit-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Edit Access"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="users-edit-head">
                <h2>Edit Access</h2>
                <button type="button" className="users-edit-close" onClick={() => setIsEditAccessModalOpen(false)}>
                  <X size={20} />
                </button>
              </header>

              <div className="users-edit-body">
                <div className="users-edit-panel">
                  <p className="users-edit-subtitle">Anna Henisky has access to the following locations:</p>

                  <div className="users-invite-location-card">
                    <div className="users-invite-location-row users-invite-location-row-head">
                      <div className="users-invite-location-left">
                        <span className="users-invite-checkbox" />
                        <strong>State</strong>
                      </div>
                      <div className="users-invite-location-right">
                        <span># of locations</span>
                        <ChevronUp size={15} />
                      </div>
                    </div>

                    <div className="users-invite-location-list">
                      {["Location Name", "Location Name", "Location Name", "Location Name"].map((location, index) => (
                        <div key={`${location}-edit-${index}`} className="users-invite-location-row users-invite-location-subrow">
                          <div className="users-invite-location-left">
                            <span className={`users-invite-checkbox${index < 2 ? " checked" : ""}`}>
                              {index < 2 && <Check size={11} />}
                            </span>
                            <span>{location}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="users-invite-location-row">
                      <div className="users-invite-location-left">
                        <span className="users-invite-checkbox checked">
                          <Check size={11} />
                        </span>
                        <strong>Texas</strong>
                      </div>
                      <div className="users-invite-location-right">
                        <span>10 locations</span>
                        <ChevronDown size={15} />
                      </div>
                    </div>

                    <div className="users-invite-location-row">
                      <div className="users-invite-location-left">
                        <span className="users-invite-checkbox" />
                        <strong>Florida</strong>
                      </div>
                      <div className="users-invite-location-right">
                        <span>3 Locations</span>
                        <ChevronDown size={15} />
                      </div>
                    </div>
                  </div>

                  <p className="users-invite-selected-count users-edit-selected-count">12 Locations selected</p>

                  <button type="button" className="users-edit-remove-btn" onClick={() => setIsRemoveConfirmOpen(true)}>
                    Remove User
                  </button>
                </div>
              </div>

              <footer className="users-edit-foot">
                <button type="button" className="users-invite-submit" onClick={() => setIsEditAccessModalOpen(false)}>
                  Save
                </button>
              </footer>
            </section>
          </div>
        )}

        {isRemoveConfirmOpen && (
          <div className="users-remove-overlay" role="presentation" onClick={() => setIsRemoveConfirmOpen(false)}>
            <section
              className="users-remove-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Remove User"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="users-remove-head">
                <h3>Remove User</h3>
                <button type="button" className="users-remove-close" onClick={() => setIsRemoveConfirmOpen(false)}>
                  <X size={18} />
                </button>
              </header>

              <p className="users-remove-text">
                Please confirm the the guest email address you wish to resend the transaction receipt to.
              </p>

              <label className="users-remove-email-field">
                <span>Guest Email Address</span>
                <input type="text" value="hotmail123@gmail.com" readOnly />
              </label>

              <button
                type="button"
                className="users-remove-primary"
                onClick={() => {
                  setIsRemoveConfirmOpen(false);
                  setIsEditAccessModalOpen(false);
                }}
              >
                Remove User
              </button>

              <button type="button" className="users-remove-cancel" onClick={() => setIsRemoveConfirmOpen(false)}>
                Cancel
              </button>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}










