import { ChevronDown, Clock3, Upload } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import brandPng from "../assets/images/brand.png";
import bannerPng from "../assets/images/banner.png";

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const validTabs = new Set(["general", "kitchen-hours", "branding"]);

export default function Settings() {
  const { tab } = useParams();
  const activeTab = validTabs.has(tab || "") ? tab : "kitchen-hours";
  const [brandLogo, setBrandLogo] = useState(brandPng);
  const [bannerImage, setBannerImage] = useState(bannerPng);

  return (
    <div className="dashboard settings-page">
      <div className="content page-content">
        <h1 className="title">Settings</h1>

        <div className="settings-tabs">
          <NavLink to="/settings/general" className={({ isActive }) => (isActive ? "active" : "")}>General</NavLink>
          <NavLink to="/settings/kitchen-hours" className={({ isActive }) => (isActive ? "active" : "")}>Kitchen Hours</NavLink>
          <NavLink to="/settings/branding" className={({ isActive }) => (isActive ? "active" : "")}>Branding</NavLink>
        </div>

        <section className="settings-card">
          {activeTab === "general" && (
            <>
              <h2>Location Info</h2>

              <div className="location-info-grid">
                <div className="info-row">
                  <span>Location Name</span>
                  <strong>DFW E17</strong>
                </div>

                <div className="info-row">
                  <span>Restaurant ID</span>
                  <strong>667123</strong>
                </div>

                <div className="info-row">
                  <span>Address</span>
                  <strong>****1111</strong>
                </div>

                <div className="info-row">
                  <span>Phone Number</span>
                  <strong>901 173 1843</strong>
                </div>
              </div>
            </>
          )}

          {activeTab === "kitchen-hours" && (
            <>
              <h2>Kitchen Hours</h2>

              <div className="kitchen-hours-grid">
                {weekDays.map((day) => (
                  <div className="kitchen-row" key={day}>
                    <div className="kitchen-day">{day}</div>

                    <div className="time-box with-icon">
                      <span>Open Time</span>
                      <strong>9:12 AM</strong>
                      <Clock3 size={16} />
                    </div>

                    <span className="to-label">to</span>

                    <div className="time-box with-dropdown">
                      <span>Close Day</span>
                      <strong>Tuesday</strong>
                      <ChevronDown size={14} />
                    </div>

                    <div className="time-box with-icon">
                      <span>Close Time</span>
                      <strong>1:05 AM</strong>
                      <Clock3 size={16} />
                    </div>

                    <label className="closed-check">
                      <input type="checkbox" />
                      <span>Closed</span>
                    </label>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "branding" && (
            <>
              <h2>Branding</h2>

              <div className="branding-section">
                <div className="branding-item">
                  <h3>Brand Logo</h3>
                  <div className="branding-row">
                    <div className="upload-area">
                      <div className="upload-icon">
                        <Upload size={24} />
                      </div>
                      <p className="upload-text">Click to upload or drag and drop</p>
                      <p className="upload-format">(SVG, JPG, PNG, or gif maximum 900x600)</p>
                    </div>
                    <div className="preview-area">
                      {brandLogo ? (
                        <>
                          <div className="preview-image">
                            <img src={brandLogo} alt="Brand Logo" />
                          </div>
                          <button className="remove-link" onClick={() => setBrandLogo(null)}>Remove image</button>
                        </>
                      ) : (
                        <>
                          <div className="preview-placeholder">
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                              <circle cx="30" cy="20" r="8" fill="#ccc" />
                              <circle cx="20" cy="35" r="5" fill="#4a90e2" />
                              <circle cx="40" cy="35" r="5" fill="#f5f5f5" opacity="0.7" />
                              <path d="M25 45 Q30 50 35 45" stroke="#ccc" strokeWidth="2" fill="none" />
                            </svg>
                          </div>
                          <button className="remove-link remove-disabled" disabled>Remove image</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="branding-item">
                  <h3>Banner Image</h3>
                  <p className="branding-description">This image will show up as a banner across user menu. Please upload a picture of your restaurant.</p>
                  <div className="branding-row">
                    <div className="upload-area">
                      <div className="upload-icon">
                        <Upload size={24} />
                      </div>
                      <p className="upload-text">Click to upload or drag and drop</p>
                      <p className="upload-format">(SVG, JPG, PNG, or gif maximum 900x600)</p>
                    </div>
                    <div className="preview-area">
                      {bannerImage ? (
                        <>
                          <div className="preview-image">
                            <img src={bannerImage} alt="Banner" />
                          </div>
                          <button className="remove-link" onClick={() => setBannerImage(null)}>Remove image</button>
                        </>
                      ) : (
                        <>
                          <div className="preview-placeholder">
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                              <path d="M15 15 Q30 5 45 15 L45 50 Q30 55 15 50 Z" fill="#ccc" opacity="0.3" />
                              <circle cx="25" cy="25" r="8" fill="#8b7355" />
                              <line x1="10" y1="45" x2="50" y2="45" stroke="#ccc" strokeWidth="2" />
                            </svg>
                          </div>
                          <button className="remove-link remove-disabled" disabled>Remove image</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="settings-save-wrap">
            <button type="button" className="settings-save-btn" disabled>
              Save
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
