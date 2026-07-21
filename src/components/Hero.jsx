function Hero({ status, startListening }) {
  return (
    <section className="hero">
      <div className="hero__bg" />
      <div className="hero__overlay" />

      <div className="hero__rings" aria-hidden="true">
        <span className="ring ring--1" />
        <span className="ring ring--2" />
        <span className="ring ring--3" />
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">
          Speak. Discover. Move in.
        </p>

        <h1 className="hero__title">
          Find your next home
          <br />
          by simply{" "}
          <span className="hero__title-accent">
            saying it out loud.
          </span>
        </h1>

        <p className="hero__subtitle">
          Sun-lit residences, green neighbourhoods and
          premium addresses — surfaced instantly by
          voice, powered by AI.
        </p>

        <button
          className={`mic-btn ${
            status === "🎤 Listening..."
              ? "mic-btn--listening"
              : ""
          }`}
          onClick={startListening}
        >
          <span className="mic-btn__icon">🎤</span>
          <span>Start Voice Search</span>
        </button>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">
              1,200+
            </span>
            <span className="hero__stat-label">
              Verified Homes
            </span>
          </div>

          <span className="hero__stat-divider" />

          <div className="hero__stat">
            <span className="hero__stat-num">
              18
            </span>
            <span className="hero__stat-label">
              Cities Covered
            </span>
          </div>

          <span className="hero__stat-divider" />

          <div className="hero__stat">
            <span className="hero__stat-num">
              4.8★
            </span>
            <span className="hero__stat-label">
              Avg. Rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;