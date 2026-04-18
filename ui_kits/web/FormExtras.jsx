// FormExtras.jsx — Radio, RadioGroup, Switch, Slider, Dropdown, DatePicker, Autocomplete.
const { useState: useStateFE, useRef: useRefFE, useEffect: useEffectFE } = React;

function Radio({ label, checked, onChange, name, value }) {
  return (
    <label className="wd-radio">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
      <span className="wd-radio-dot" aria-hidden></span>
      <span>{label}</span>
    </label>
  );
}

function RadioGroup({ label, options, value, onChange, name }) {
  return (
    <div className="wd-field">
      {label && <label className="wd-label">{label}</label>}
      <div className="wd-radio-group">
        {options.map(o => (
          <Radio
            key={o.value}
            name={name}
            value={o.value}
            label={o.label}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
          />
        ))}
      </div>
    </div>
  );
}

function Switch({ label, checked, onChange }) {
  return (
    <label className="wd-switch">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="wd-switch-track"><span className="wd-switch-thumb"></span></span>
      {label && <span className="wd-switch-label">{label}</span>}
    </label>
  );
}

function Slider({ label, value, onChange, min = 0, max = 100, step = 1, format }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="wd-field">
      {label && (
        <div className="wd-slider-head">
          <label className="wd-label">{label}</label>
          <span className="wd-slider-val">{format ? format(value) : value}</span>
        </div>
      )}
      <div className="wd-slider">
        <div className="wd-slider-track">
          <div className="wd-slider-fill" style={{width: `${pct}%`}}></div>
        </div>
        <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} />
      </div>
    </div>
  );
}

function Dropdown({ label, value, onChange, options, placeholder = 'Select…' }) {
  const [open, setOpen] = useStateFE(false);
  const ref = useRefFE();
  useEffectFE(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);
  const current = options.find(o => o.value === value);
  return (
    <div className="wd-field" ref={ref}>
      {label && <label className="wd-label">{label}</label>}
      <button type="button" className={`wd-dd-btn ${open ? 'is-open' : ''}`} onClick={() => setOpen(o => !o)}>
        <span className={current ? '' : 'wd-dd-placeholder'}>{current ? current.label : placeholder}</span>
        <span className="wd-dd-caret">▾</span>
      </button>
      {open && (
        <div className="wd-dd-menu">
          {options.map(o => (
            <div
              key={o.value}
              className={`wd-dd-item ${o.value === value ? 'is-selected' : ''}`}
              onClick={() => { onChange(o.value); setOpen(false); }}
            >
              {o.icon && <span className="wd-dd-icon">{o.icon}</span>}
              <span>{o.label}</span>
              {o.value === value && <span className="wd-dd-check">✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DatePicker({ label, value, onChange }) {
  // value: Date or null
  const [open, setOpen] = useStateFE(false);
  const [view, setView] = useStateFE(() => value || new Date(2026, 3, 1));
  const ref = useRefFE();
  useEffectFE(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const fmt = (d) => d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const y = view.getFullYear(), m = view.getMonth();
  const firstDow = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const today = new Date();
  const sameDay = (a, b) => a && b && a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();

  return (
    <div className="wd-field" ref={ref}>
      {label && <label className="wd-label">{label}</label>}
      <button type="button" className={`wd-dd-btn ${open ? 'is-open' : ''}`} onClick={() => setOpen(o => !o)}>
        <span className="wd-dp-icon">📅</span>
        <span className={value ? '' : 'wd-dd-placeholder'}>{value ? fmt(value) : 'Pick a date'}</span>
        <span className="wd-dd-caret">▾</span>
      </button>
      {open && (
        <div className="wd-dp-panel">
          <div className="wd-dp-head">
            <button className="wd-dp-nav" onClick={() => setView(new Date(y, m - 1, 1))}>‹</button>
            <span className="wd-dp-title">{months[m]} {y}</span>
            <button className="wd-dp-nav" onClick={() => setView(new Date(y, m + 1, 1))}>›</button>
          </div>
          <div className="wd-dp-grid wd-dp-dow">
            {['S','M','T','W','T','F','S'].map((d, i) => <span key={i} className="wd-dp-dow-cell">{d}</span>)}
          </div>
          <div className="wd-dp-grid">
            {cells.map((d, i) => {
              if (!d) return <span key={i} className="wd-dp-cell wd-dp-empty"></span>;
              const date = new Date(y, m, d);
              const isSel = sameDay(date, value);
              const isToday = sameDay(date, today);
              return (
                <button
                  key={i}
                  className={`wd-dp-cell ${isSel ? 'is-selected' : ''} ${isToday ? 'is-today' : ''}`}
                  onClick={() => { onChange(date); setOpen(false); }}
                >{d}</button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Autocomplete({ label, value, onChange, options, placeholder = 'Type to search…' }) {
  const [query, setQuery] = useStateFE(value || '');
  const [open, setOpen] = useStateFE(false);
  const [hover, setHover] = useStateFE(0);
  const ref = useRefFE();
  useEffectFE(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);
  const matches = options.filter(o => o.toLowerCase().includes(query.toLowerCase())).slice(0, 6);
  const pick = (v) => { setQuery(v); onChange && onChange(v); setOpen(false); };
  return (
    <div className="wd-field" ref={ref}>
      {label && <label className="wd-label">{label}</label>}
      <div className="wd-ac">
        <span className="wd-ac-icon">🔎</span>
        <input
          className="wd-input wd-ac-input"
          placeholder={placeholder}
          value={query}
          onFocus={() => setOpen(true)}
          onChange={e => { setQuery(e.target.value); setOpen(true); setHover(0); }}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') setHover(h => Math.min(matches.length - 1, h + 1));
            if (e.key === 'ArrowUp') setHover(h => Math.max(0, h - 1));
            if (e.key === 'Enter' && matches[hover]) pick(matches[hover]);
          }}
        />
      </div>
      {open && matches.length > 0 && (
        <div className="wd-dd-menu">
          {matches.map((m, i) => (
            <div key={m} className={`wd-dd-item ${i === hover ? 'is-hover' : ''}`} onMouseEnter={() => setHover(i)} onClick={() => pick(m)}>
              <span dangerouslySetInnerHTML={{__html: highlight(m, query)}} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function highlight(text, q) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return text.slice(0, i) + '<mark>' + text.slice(i, i + q.length) + '</mark>' + text.slice(i + q.length);
}

Object.assign(window, { Radio, RadioGroup, Switch, Slider, Dropdown, DatePicker, Autocomplete });
