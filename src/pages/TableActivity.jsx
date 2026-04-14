const tableData = [
  { number: 1, status: "PAID", statusColor: "paid", amount: null, checkId: "13wdF2G2", lastUpdated: "8:19 PM" },
  { number: 2, status: "PARTIAL", statusColor: "partial", amount: "$125.23", checkId: "13wdF2G2", lastUpdated: "8:19 PM" },
  { number: 4, status: "DUE", statusColor: "due", amount: "$42.11", checkId: "13wdF2G2", lastUpdated: "8:19 PM" },
  { number: 6, status: "PAID", statusColor: "paid", amount: null, checkId: "12345e", lastUpdated: "8:19 PM" },
  { number: 7, status: "PAID", statusColor: "paid", amount: null, checkId: "123456", lastUpdated: "8:19 PM" },
  { number: 10, status: "PAID", statusColor: "paid", amount: null, checkId: "123456", lastUpdated: "8:19 PM" },
  { number: 8, status: "DUE", statusColor: "due", amount: "$21.10", checkId: "123456", lastUpdated: "8:19 PM" },
  { number: 12, status: "PAID", statusColor: "paid", amount: null, checkId: "123456", lastUpdated: "8:19 PM" },
  { number: 14, status: "PAID", statusColor: "paid", amount: null, checkId: "123456", lastUpdated: "8:19 PM" },
  { number: 16, status: "DUE", statusColor: "due", amount: "$112.12", checkId: "123456", lastUpdated: "8:19 PM" },
  { number: 17, status: "DUE", statusColor: "due", amount: "$21.14", checkId: "123456", lastUpdated: "8:19 PM" },
  { number: 18, status: "PAID", statusColor: "paid", amount: null, checkId: "123456", lastUpdated: "8:19 PM" },
];

export default function TableActivity() {
  return (
    <div className="dashboard table-activity-page">
      <div className="content page-content">
        <h1 className="ta-title">Table Activity</h1>

        <div className="ta-grid">
          {tableData.map((table) => (
            <div key={table.number} className="ta-card">
              <div className="ta-card-header">
                <span className="ta-label">TABLE</span>
                <div className="ta-header-right">
                  {table.amount && <span className="ta-amount">{table.amount}</span>}
                  <span className={`ta-status-badge ta-status-${table.statusColor}`}>
                    {table.status}
                  </span>
                </div>
              </div>

              <div className="ta-number">{table.number}</div>

              <div className="ta-card-footer">
                <div className="ta-footer-col">
                  <span className="ta-footer-label">Check #</span>
                  <span className="ta-footer-value">{table.checkId}</span>
                </div>
                <div className="ta-footer-col">
                  <span className="ta-footer-label">Last Updated</span>
                  <span className="ta-footer-value">{table.lastUpdated}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
