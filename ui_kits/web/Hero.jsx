// Hero.jsx — marketing hero section with headline, subhead, CTAs.
function Hero() {
  return (
    <section className="wd-hero">
      <div className="wd-container wd-hero-inner">
        <span className="wd-eyebrow wd-hero-eyebrow">New · v2.0</span>
        <h1 className="wd-hero-title">A UI system you can <em>re-theme</em> in one file.</h1>
        <p className="wd-hero-sub">Responsive components, fully token-driven. Drop them in, swap the variables, ship.</p>
        <div className="wd-hero-cta">
          <button className="wd-btn wd-btn-primary wd-btn-lg">Start building</button>
          <button className="wd-btn wd-btn-secondary wd-btn-lg">Read the docs →</button>
        </div>
        <div className="wd-hero-trust">
          <span>Trusted by teams at</span>
          <div className="wd-hero-logos">
            {['Northwind', 'Acme', 'Globex', 'Initech', 'Umbrella'].map(n => <span key={n} className="wd-hero-logo">{n}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
