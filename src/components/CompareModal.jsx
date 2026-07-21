// Side-by-side comparison table for 2-3 selected properties.
// Read-only view built entirely from props — no new global state.
function CompareModal({ compareList, onClose }) {
  const rows = [
    {
      label: "💰 Price",
      render: (f) => `₹${Number(f.Price).toLocaleString("en-IN")}`,
    },
    { label: "📍 City", render: (f) => f.City },
    { label: "🏥 Nearby Hospital", render: (f) => f.Hospital },
    {
      label: "🛗 Lift",
      render: (f) => (f.Lift ? "Available" : "Not Available"),
      highlight: (f) => !!f.Lift,
    },
    {
      label: "🚗 Parking",
      render: (f) => (f.Parking ? "Available" : "Not Available"),
      highlight: (f) => !!f.Parking,
    },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="compare-modal glass"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close-x" onClick={onClose}>
          ✖
        </button>

        <h2 className="compare-modal__title">Compare Residences</h2>
        <p className="compare-modal__subtitle">
          Side-by-side view of your shortlisted homes
        </p>

        <div
          className="compare-table"
          style={{ gridTemplateColumns: `140px repeat(${compareList.length}, 1fr)` }}
        >
          <div className="compare-table__row compare-table__row--head">
            <div className="compare-table__label" />
            {compareList.map((f) => (
              <div key={f.FlatID} className="compare-table__col-head">
                <img src={f.ImageURL} alt={f.BHK} />
                <h4>{f.BHK}</h4>
              </div>
            ))}
          </div>

          {rows.map((row) => (
            <div className="compare-table__row" key={row.label}>
              <div className="compare-table__label">{row.label}</div>
              {compareList.map((f) => (
                <div
                  key={f.FlatID}
                  className={`compare-table__cell ${
                    row.highlight && row.highlight(f)
                      ? "compare-table__cell--good"
                      : ""
                  }`}
                >
                  {row.render(f)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompareModal;
