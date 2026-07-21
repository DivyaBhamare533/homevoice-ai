function SearchPanel({
  status,
  text,
  quickQuestions,
  searchFlats,
  isBusy,
}) {
  return (
    <section className="search-panel" id="search">
      <div className="search-panel__card glass">
        <div className="search-panel__row">
          <div className="search-panel__status-block">
            <span
              className={`status-pill ${
                isBusy ? "status-pill--busy" : ""
              }`}
            >
              {status}
            </span>

            <h3 className="search-panel__label">
              You said
            </h3>

            <p className="search-panel__text">
              {text}
            </p>
          </div>

          <div className="search-panel__quick">
            <h3 className="search-panel__label">
              Try asking
            </h3>

            <div className="chip-row">
              {quickQuestions.slice(0, 4).map((q) => (
                <span
                  key={q}
                  className="chip chip--ghost"
                  onClick={() => searchFlats(q)}
                >
                  {q}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchPanel;