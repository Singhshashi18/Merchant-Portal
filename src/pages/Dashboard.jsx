import { useEffect, useRef, useState } from "react";
import { ChevronDown, Ellipsis } from "lucide-react";

const weekBars = [
  { day: "SUN", value: "20%", delta: "4%", activeHeight: 60, bgHeight: 114 },
  { day: "MON", value: "20%", delta: "4%", activeHeight: 74, bgHeight: 136 },
  { day: "TUE", value: "20%", delta: "4%", activeHeight: 48, bgHeight: 90 },
  { day: "WED", value: "20%", delta: "4%", activeHeight: 64, bgHeight: 120 },
  { day: "THU", value: "20%", delta: "4%", activeHeight: 48, bgHeight: 90 },
  { day: "FRI", value: "20%", delta: "4%", activeHeight: 70, bgHeight: 132 },
  { day: "SAT", value: "20%", delta: "4%", activeHeight: 60, bgHeight: 114 },
];

export default function Dashboard() {
  const [isTimeRangeOpen, setIsTimeRangeOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("Last week");
  const timeRangeRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!timeRangeRef.current) {
        return;
      }

      if (!timeRangeRef.current.contains(event.target)) {
        setIsTimeRangeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="dashboard insights-page">
      <div className="content page-content">
        <div className="insights-head">
          <h1 className="title">Insights</h1>

          <div className="time-range-wrap" ref={timeRangeRef}>
            <button
              type="button"
              className="time-range-btn"
              onClick={() => setIsTimeRangeOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isTimeRangeOpen}
            >
              <span className="caption">TIME RANGE</span>
              <span className="value">
                {timeRange}
                <ChevronDown size={14} />
              </span>
            </button>

            {isTimeRangeOpen && (
              <div className="time-range-dropdown" role="listbox" aria-label="Time range filter">
                {["Today", "Yesterday", "This week", "Last week", "This month", "Last month"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`time-range-option${timeRange === option ? " active" : ""}`}
                    onClick={() => {
                      setTimeRange(option);
                      setIsTimeRangeOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="insights-top-grid">
          <div className="insight-card">
            <p className="label">NET SALES</p>
          <h2>
              $19,242 <span className="pill green">4%</span>
            </h2>
            <p className="sub">Compared to last 30 days</p>
          </div>

          <div className="insight-card">
            <p className="label">TABS CLOSED</p>
            <h2>
              12 <span className="pill red">-10%</span>
            </h2>
            <p className="sub">Compared to last 30 days</p>
          </div>

          <div className="insight-card">
            <p className="label">AVG. TAB</p>
            <h2>2,124</h2>
            <div className="metric-line">
              <div className="fill" style={{ width: "64%" }} />
            </div>
            <p className="sub">Compared to last 30 days</p>
          </div>

          <div className="insight-card">
            <p className="label">AVG. TIP %</p>
            <h2>18%</h2>
            <div className="metric-line">
              <div className="fill" style={{ width: "48%" }} />
            </div>
            <p className="sub">Compared to last 30 days</p>
          </div>
        </div>

        <div className="insights-middle-grid">
          <div className="insights-panel adoption-panel">
            <div className="panel-head">
              <div>
                <h2>Adoption Rate</h2>
                <p>Compared to 10/11/21 - 11/11/21</p>
              </div>
              <button type="button" className="panel-dot-btn" aria-label="More options">
                <Ellipsis size={16} />
              </button>
            </div>

            <div className="adoption-donut" />

            <div className="donut-stats">
              <div>
                <h2>
                  70% <span className="pill green">4%</span>
                </h2>
                <p>GLYDE TRANSACTIONS</p>
              </div>
              <div>
                <h2>25%</h2>
                <p>OTHER TRANSACTIONS</p>
              </div>
            </div>
          </div>

          <div className="insights-panel tips-panel">
            <div className="panel-head">
              <div>
                <h2>Avg Tips per day of the week</h2>
                <p>Compared to last week</p>
              </div>
            </div>

            <div className="tips-bars">
              {weekBars.map((item) => (
                <div key={item.day} className="tips-bar-col">
                  <div className="tips-bar-track" style={{ height: `${item.bgHeight}px` }}>
                    <div className="tips-bar-fill" style={{ height: `${item.activeHeight}px` }} />
                  </div>
                  <span className="tips-day">{item.day}</span>
                  <span className="tips-value">{item.value}</span>
                  <span className="tips-pill">{item.delta}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="insights-bottom-grid">
          <div className="insight-card">
            <p className="label">TOTAL TRANSACTION VALUE</p>
            <h2>
              $5,300.00 <span className="pill green">4%</span>
            </h2>
            <p className="sub">Compared to last week</p>
          </div>

          <div className="insight-card">
            <p className="label">NEW UNIQUE EMAILS</p>
            <h2>
              12 <span className="pill red">-10%</span>
            </h2>
            <p className="sub">Compared to last week</p>
          </div>

          <div className="insight-card">
            <p className="label">HIGHEST PERFORMING SERVER</p>
            <h1>Alcidas Antonio</h1>
            <p className="sub">Compared to last week</p>
          </div>

          <div className="insight-card">
            <p className="label">POS AGENT HEALTH</p>
            <h2>99%</h2>
            <div className="metric-line">
              <div className="fill" style={{ width: "70%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}