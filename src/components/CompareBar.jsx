// Floating bar showing properties currently queued for comparison.
// Purely presentational — all state lives in App.jsx and is passed in as props.
function CompareBar({ compareList, onRemove, onOpen, onClear }) {
  if (!compareList || compareList.length === 0) return null;

  const placeholders = Array.from({ length: Math.max(0, 3 - compareList.length) });

  return (
    <div className="compare-bar glass">
      <div className="compare-bar__items">
        {compareList.map((flat) => (
          <div key={flat.FlatID} className="compare-bar__item">
            <img src={flat.ImageURL} alt={flat.BHK} />
            <button
              className="compare-bar__remove"
              onClick={() => onRemove(flat.FlatID)}
              aria-label="Remove from comparison"
            >
              ✕
            </button>
          </div>
        ))}

        {placeholders.map((_, i) => (
          <div key={`empty-${i}`} className="compare-bar__item compare-bar__item--empty">
            +
          </div>
        ))}
      </div>

      <div className="compare-bar__meta">
        <span className="compare-bar__count">
          {compareList.length} / 3 selected
        </span>

        <div className="compare-bar__actions">
          <button className="compare-bar__clear" onClick={onClear}>
            Clear
          </button>
          <button
            className="compare-bar__cta"
            onClick={onOpen}
            disabled={compareList.length < 2}
          >
            Compare
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompareBar;
