// Primitives.jsx — small reusable atoms: Button, Input, Badge, Card, Avatar.

function Button({ variant = 'primary', size = 'md', children, ...rest }) {
  return <button className={`wd-btn wd-btn-${variant} wd-btn-${size}`} {...rest}>{children}</button>;
}

function Input({ label, hint, error, ...rest }) {
  return (
    <div className="wd-field">
      {label && <label className="wd-label">{label}</label>}
      <input className={`wd-input ${error ? 'is-error' : ''}`} {...rest} />
      {error ? <span className="wd-err">{error}</span> : hint ? <span className="wd-hint">{hint}</span> : null}
    </div>
  );
}

function Select({ label, options = [], ...rest }) {
  return (
    <div className="wd-field">
      {label && <label className="wd-label">{label}</label>}
      <select className="wd-input" {...rest}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Checkbox({ label, ...rest }) {
  return (
    <label className="wd-check">
      <input type="checkbox" {...rest} />
      <span>{label}</span>
    </label>
  );
}

function Badge({ tone = 'neutral', children }) {
  return <span className={`wd-badge wd-badge-${tone}`}>{children}</span>;
}

function Card({ children, interactive = false, ...rest }) {
  return <div className={`wd-card ${interactive ? 'is-interactive' : ''}`} {...rest}>{children}</div>;
}

function Avatar({ initials, tone = 'primary' }) {
  return <span className={`wd-avatar wd-avatar-${tone}`}>{initials}</span>;
}

Object.assign(window, { Button, Input, Select, Checkbox, Badge, Card, Avatar });
