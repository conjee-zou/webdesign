// Header.jsx — top navigation with brand, links, auth CTAs, mobile menu toggle.
const { useState } = React;

function Header({ onNav }) {
  const [open, setOpen] = useState(false);
  const links = ['Product', 'Pricing', 'Docs', 'Changelog'];
  return (
    <header className="wd-header">
      <div className="wd-container wd-header-inner">
        <a className="wd-brand" onClick={() => onNav && onNav('home')}>
          <span className="wd-mark">W</span>
          <span>Webdesign</span>
        </a>
        <nav className="wd-nav-links">
          {links.map((l, i) => (
            <a key={l} className={`wd-link ${i === 0 ? 'is-active' : ''}`}>{l}</a>
          ))}
        </nav>
        <div className="wd-nav-cta">
          <button className="wd-btn wd-btn-ghost" onClick={() => onNav && onNav('signin')}>Sign in</button>
          <button className="wd-btn wd-btn-primary" onClick={() => onNav && onNav('signup')}>Get started</button>
        </div>
        <button className="wd-menu-toggle" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      {open && (
        <div className="wd-mobile-menu">
          {links.map(l => <a key={l} className="wd-link">{l}</a>)}
          <button className="wd-btn wd-btn-primary" style={{marginTop: 8}}>Get started</button>
        </div>
      )}
    </header>
  );
}

window.Header = Header;
