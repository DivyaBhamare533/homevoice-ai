function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="brand">
          <span className="brand__mark">🏠</span>
          <span className="brand__name">
            HomeVoice<span className="brand__accent">AI</span>
          </span>
        </div>

        <nav className="site-nav">
          <a href="#listings">Listings</a>
          <a href="#search">Voice Search</a>
          <a href="#footer">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;