import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  LayoutGrid,
  RefreshCw,
  Monitor,
  CircleUserRound,
  Receipt,
  Settings,
  ChevronDown,
  User,
  LogOut,
  X,
} from "lucide-react";
import li1 from "../assets/images/li1.png";
import billingIcon from "../assets/images/billing.png";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!profileRef.current) {
        return;
      }

      if (!profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const openAccountModal = () => {
    setIsProfileOpen(false);
    setIsAccountModalOpen(true);
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    navigate("/login");
  };

  return (
    <header className="navbar-wrap">
      <div className="navbar-top">
        <img src={li1} alt="Glyde" className="brand-lockup" />

        <div className="nav-right">
          <div className="fridays-badge" aria-label="TGI Fridays">
            <span>TGI</span>
            <strong>FRIDAYS</strong>
          </div>

          <button type="button" className="location-select">
            <span className="location-caption">Location</span>
            <span className="location-value">
              DFW B10
              <ChevronDown size={16} />
            </span>
          </button>

          <div className="profile-wrap" ref={profileRef}>
            <button type="button" className="profile profile-btn" onClick={() => setIsProfileOpen((prev) => !prev)}>
              OP
            </button>

            {isProfileOpen && (
              <div className="profile-menu" role="menu" aria-label="Profile menu">
                <button type="button" className="profile-menu-item" onClick={openAccountModal}>
                  <User size={16} />
                  Account
                </button>
                <button type="button" className="profile-menu-item" onClick={handleLogout}>
                  <LogOut size={16} />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="navbar-bottom">
        <ul className="nav-menu">
          <li className={pathname === "/dashboard" ? "active" : ""}>
            <Link to="/dashboard" className="nav-link">
              <LayoutGrid size={16} />
              Insights
            </Link>
          </li>

          <li className={pathname === "/transactions" ? "active" : ""}>
            <Link to="/transactions" className="nav-link">
              <RefreshCw size={16} />
              Transactions
            </Link>
          </li>

          <li className={pathname === "/terminals" ? "active" : ""}>
            <Link to="/terminals" className="nav-link">
              <Monitor size={16} />
              Terminals
            </Link>
          </li>

          <li className={pathname === "/table-activity" ? "active" : ""}>
            <Link to="/table-activity" className="nav-link">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ minWidth: '16px' }}>
                <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="4" />
                <circle cx="24" cy="24" r="7" fill="currentColor" />
              </svg>
              Table Activity
            </Link>
          </li>

          <li className={pathname === "/users" ? "active" : ""}>
            <Link to="/users" className="nav-link">
              <CircleUserRound size={16} />
              Users
            </Link>
          </li>

          <li className={pathname === "/billing" ? "active" : ""}>
            <Link to="/billing" className="nav-link">
              <img src={billingIcon} alt="Billing" style={{ width: '16px', height: '16px' }} />
              Billing
            </Link>
          </li>

          <li className={pathname.startsWith("/settings") ? "active" : ""}>
            <Link to="/settings/kitchen-hours" className="nav-link">
              <Settings size={16} />
              Settings
            </Link>
          </li>
        </ul>
        <div className="menu-divider" />
      </div>

      {isAccountModalOpen && (
        <div className="nav-account-overlay" role="presentation" onClick={() => setIsAccountModalOpen(false)}>
          <section
            className="nav-account-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Account Information"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="nav-account-head">
              <h2>Account Information</h2>
              <button type="button" className="nav-account-close" onClick={() => setIsAccountModalOpen(false)}>
                <X size={18} />
              </button>
            </header>

            <div className="nav-account-body">
              <div className="nav-account-grid">
                <label className="nav-account-field">
                  <span>First Name</span>
                  <input type="text" value="Joe" readOnly />
                </label>

                <label className="nav-account-field">
                  <span>Last Name</span>
                  <input type="text" value="Gold" readOnly />
                </label>

                <label className="nav-account-field nav-account-field-full">
                  <span>Email</span>
                  <input type="text" value="dummyuser@.com" readOnly />
                </label>
              </div>

              <button type="button" className="nav-account-save" onClick={() => setIsAccountModalOpen(false)}>
                Save
              </button>
            </div>
          </section>
        </div>
      )}
    </header>
  );
}