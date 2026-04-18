// DataViews.jsx — Tabs, Table, Pagination, List.
const { useState: useStateD } = React;

function Tabs({ items, value, onChange }) {
  return (
    <div className="wd-tabs">
      {items.map(it => (
        <button
          key={it.id}
          className={`wd-tab ${value === it.id ? 'is-active' : ''}`}
          onClick={() => onChange(it.id)}
        >
          {it.label}
          {it.count != null && <span className="wd-tab-count">{it.count}</span>}
        </button>
      ))}
    </div>
  );
}

function Table({ columns, rows }) {
  return (
    <div className="wd-table-wrap">
      <table className="wd-table">
        <thead>
          <tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{columns.map(c => <td key={c.key}>{c.render ? c.render(r) : r[c.key]}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Pagination({ page, total, onChange }) {
  const pages = [];
  const push = v => pages.push(v);
  push(1);
  if (page > 3) push('…');
  for (let p = Math.max(2, page - 1); p <= Math.min(total - 1, page + 1); p++) push(p);
  if (page < total - 2) push('…');
  if (total > 1) push(total);
  return (
    <div className="wd-pag">
      <button className={`wd-pg ${page === 1 ? 'is-disabled' : ''}`} onClick={() => page > 1 && onChange(page - 1)}>←</button>
      {pages.map((p, i) =>
        p === '…'
          ? <span key={i} className="wd-ellipsis">…</span>
          : <button key={i} className={`wd-pg ${page === p ? 'is-active' : ''}`} onClick={() => onChange(p)}>{p}</button>
      )}
      <button className={`wd-pg ${page === total ? 'is-disabled' : ''}`} onClick={() => page < total && onChange(page + 1)}>→</button>
    </div>
  );
}

function List({ items, selectedId, onSelect }) {
  return (
    <div className="wd-list">
      {items.map(it => (
        <div
          key={it.id}
          className={`wd-list-item ${selectedId === it.id ? 'is-selected' : ''}`}
          onClick={() => onSelect && onSelect(it.id)}
        >
          <span className="wd-list-ic">{it.icon}</span>
          <div className="wd-list-who">
            <span className="wd-list-name">{it.name}</span>
            <span className="wd-list-meta">{it.meta}</span>
          </div>
          <span className="wd-list-chev">›</span>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { Tabs, Table, Pagination, List });
