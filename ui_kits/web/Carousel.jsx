// Carousel.jsx — simple slide carousel with dots + prev/next.
const { useState: useStateC } = React;
function Carousel({ slides = [] }) {
  const [i, setI] = useStateC(0);
  const n = slides.length;
  const go = d => setI((i + d + n) % n);
  return (
    <div className="wd-carousel">
      <div className="wd-carousel-track" style={{transform: `translateX(-${i * 100}%)`}}>
        {slides.map((s, idx) => (
          <div key={idx} className="wd-slide" style={{background: s.bg}}>
            <span className="wd-eyebrow" style={{color: s.eyebrowColor || 'var(--fg-3)'}}>{s.eyebrow}</span>
            <h3 className="wd-slide-h">{s.title}</h3>
            <p className="wd-slide-p">{s.text}</p>
          </div>
        ))}
      </div>
      <button className="wd-arrow wd-arrow-prev" onClick={() => go(-1)}>‹</button>
      <button className="wd-arrow wd-arrow-next" onClick={() => go(1)}>›</button>
      <div className="wd-dots">
        {slides.map((_, idx) => (
          <span key={idx} className={`wd-dot ${idx === i ? 'is-active' : ''}`} onClick={() => setI(idx)}></span>
        ))}
      </div>
    </div>
  );
}
window.Carousel = Carousel;
