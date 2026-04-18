// Footer.jsx — four-column site footer on dark surface.
function Footer() {
  const cols = [
    { h: 'Product', items: ['Components', 'Templates', 'Changelog', 'Roadmap'] },
    { h: 'Resources', items: ['Docs', 'Guides', 'API reference', 'Community'] },
    { h: 'Company', items: ['About', 'Careers', 'Contact', 'Press kit'] },
  ];
  return (
    <footer className="wd-footer">
      <div className="wd-container wd-footer-inner">
        <div className="wd-footer-brand">
          <div className="wd-brand" style={{color:'#fff'}}>
            <span className="wd-mark">W</span>
            <span>Webdesign</span>
          </div>
          <p className="wd-footer-tag">A modern UI system built on CSS tokens. Drop in components, retheme with a handful of variables.</p>
        </div>
        {cols.map(c => (
          <div key={c.h} className="wd-footer-col">
            <h5>{c.h}</h5>
            <ul>{c.items.map(i => <li key={i}><a>{i}</a></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="wd-container wd-footer-bottom">
        <span>© 2026 Webdesign</span>
        <span>Privacy · Terms · Security</span>
      </div>
    </footer>
  );
}

window.Footer = Footer;
