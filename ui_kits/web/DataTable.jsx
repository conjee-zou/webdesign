// DataTable.jsx — sortable, selectable, with row actions and empty state.
const { useState: useStateDT, useMemo: useMemoDT } = React;

function DataTable({ columns, rows, selectable = true, onRowAction }) {
  const [sort, setSort] = useStateDT({ key: null, dir: 'asc' });
  const [selected, setSelected] = useStateDT(new Set());

  const sorted = useMemoDT(() => {
    if (!sort.key) return rows;
    const col = columns.find(c => c.key === sort.key);
    if (!col || col.sortable === false) return rows;
    const arr = [...rows].sort((a, b) => {
      const av = a[sort.key], bv = b[sort.key];
      if (av === bv) return 0;
      return (av > bv ? 1 : -1) * (sort.dir === 'asc' ? 1 : -1);
    });
    return arr;
  }, [rows, sort, columns]);

  const toggleSort = (key) => {
    setSort(s => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' });
  };
  const toggleRow = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };
  const toggleAll = () => {
    if (selected.size === sorted.length) setSelected(new Set());
    else setSelected(new Set(sorted.map(r => r.id)));
  };
  const allSelected = sorted.length > 0 && selected.size === sorted.length;
  const someSelected = selected.size > 0 && !allSelected;

  return (
    <div className="wd-dt-wrap">
      {selected.size > 0 && (
        <div className="wd-dt-bulk">
          <span>{selected.size} selected</span>
          <div style={{marginLeft: 'auto', display: 'flex', gap: 8}}>
            <button className="wd-btn wd-btn-ghost wd-btn-sm">Export</button>
            <button className="wd-btn wd-btn-ghost wd-btn-sm" style={{color: 'var(--danger-500)'}}>Delete</button>
            <button className="wd-btn wd-btn-secondary wd-btn-sm" onClick={() => setSelected(new Set())}>Clear</button>
          </div>
        </div>
      )}
      <div className="wd-table-wrap">
        <table className="wd-table wd-dt">
          <thead>
            <tr>
              {selectable && (
                <th className="wd-dt-check">
                  <input type="checkbox" checked={allSelected} ref={el => el && (el.indeterminate = someSelected)} onChange={toggleAll} />
                </th>
              )}
              {columns.map(c => (
                <th
                  key={c.key}
                  className={c.sortable !== false ? 'wd-dt-sortable' : ''}
                  onClick={() => c.sortable !== false && toggleSort(c.key)}
                >
                  <span className="wd-dt-th">
                    {c.label}
                    {c.sortable !== false && (
                      <span className={`wd-dt-sort ${sort.key === c.key ? 'is-active' : ''}`}>
                        {sort.key === c.key ? (sort.dir === 'asc' ? '↑' : '↓') : '↕'}
                      </span>
                    )}
                  </span>
                </th>
              ))}
              {onRowAction && <th style={{width: 48}}></th>}
            </tr>
          </thead>
          <tbody>
            {sorted.map(r => (
              <tr key={r.id} className={selected.has(r.id) ? 'is-selected' : ''}>
                {selectable && (
                  <td className="wd-dt-check">
                    <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggleRow(r.id)} />
                  </td>
                )}
                {columns.map(c => <td key={c.key}>{c.render ? c.render(r) : r[c.key]}</td>)}
                {onRowAction && (
                  <td>
                    <button className="wd-dt-action" onClick={() => onRowAction(r)} aria-label="Row actions">⋯</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

window.DataTable = DataTable;
