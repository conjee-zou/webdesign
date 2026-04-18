// Charts.jsx — LineChart, BarChart, DonutChart. Pure SVG, no deps.

function LineChart({ data, width = 560, height = 200, color = 'var(--primary-600)', label }) {
  // data: [{x: string, y: number}]
  const pad = { t: 16, r: 16, b: 28, l: 32 };
  const W = width - pad.l - pad.r;
  const H = height - pad.t - pad.b;
  const ys = data.map(d => d.y);
  const maxY = Math.max(...ys) * 1.1;
  const minY = 0;
  const x = i => pad.l + (i / (data.length - 1)) * W;
  const y = v => pad.t + H - ((v - minY) / (maxY - minY)) * H;

  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d.y)}`).join(' ');
  const area = `${path} L ${x(data.length - 1)} ${pad.t + H} L ${x(0)} ${pad.t + H} Z`;
  const gridY = [0, 0.25, 0.5, 0.75, 1].map(t => pad.t + H * t);

  return (
    <div className="wd-chart">
      {label && <div className="wd-chart-label">{label}</div>}
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="wdLineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {gridY.map((gy, i) => (
          <line key={i} x1={pad.l} x2={pad.l + W} y1={gy} y2={gy} stroke="var(--border-1)" strokeDasharray={i === 4 ? '0' : '2 4'} />
        ))}
        <path d={area} fill="url(#wdLineFill)" />
        <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d.y)} r="3.5" fill="#fff" stroke={color} strokeWidth="2" />
        ))}
        {data.map((d, i) => (
          <text key={i} x={x(i)} y={height - 8} textAnchor="middle" fontSize="11" fill="var(--fg-3)" fontFamily="var(--font-sans)">{d.x}</text>
        ))}
      </svg>
    </div>
  );
}

function BarChart({ data, width = 560, height = 200, color = 'var(--primary-600)', label }) {
  const pad = { t: 16, r: 16, b: 28, l: 32 };
  const W = width - pad.l - pad.r;
  const H = height - pad.t - pad.b;
  const ys = data.map(d => d.y);
  const maxY = Math.max(...ys) * 1.15;
  const bw = W / data.length;
  const gap = bw * 0.3;
  return (
    <div className="wd-chart">
      {label && <div className="wd-chart-label">{label}</div>}
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <line x1={pad.l} x2={pad.l + W} y1={pad.t + H} y2={pad.t + H} stroke="var(--border-2)" />
        {data.map((d, i) => {
          const bh = (d.y / maxY) * H;
          const bx = pad.l + i * bw + gap / 2;
          const by = pad.t + H - bh;
          return (
            <g key={i}>
              <rect x={bx} y={by} width={bw - gap} height={bh} rx="4" fill={color} opacity={d.highlight ? 1 : 0.72} />
              <text x={bx + (bw - gap) / 2} y={height - 8} textAnchor="middle" fontSize="11" fill="var(--fg-3)" fontFamily="var(--font-sans)">{d.x}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function DonutChart({ data, size = 180, label }) {
  // data: [{label, value, color}]
  const total = data.reduce((a, b) => a + b.value, 0);
  const R = size / 2 - 14, r = R - 18;
  const cx = size / 2, cy = size / 2;
  let acc = 0;
  const arcs = data.map(seg => {
    const start = acc / total;
    acc += seg.value;
    const end = acc / total;
    const a0 = start * Math.PI * 2 - Math.PI / 2;
    const a1 = end * Math.PI * 2 - Math.PI / 2;
    const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0);
    const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
    const ix0 = cx + r * Math.cos(a0), iy0 = cy + r * Math.sin(a0);
    const ix1 = cx + r * Math.cos(a1), iy1 = cy + r * Math.sin(a1);
    const large = end - start > 0.5 ? 1 : 0;
    const d = [
      `M ${x0} ${y0}`,
      `A ${R} ${R} 0 ${large} 1 ${x1} ${y1}`,
      `L ${ix1} ${iy1}`,
      `A ${r} ${r} 0 ${large} 0 ${ix0} ${iy0}`,
      'Z',
    ].join(' ');
    return { ...seg, d };
  });
  return (
    <div className="wd-chart wd-donut">
      {label && <div className="wd-chart-label">{label}</div>}
      <div className="wd-donut-row">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {arcs.map((a, i) => <path key={i} d={a.d} fill={a.color} />)}
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--fg-1)" fontFamily="var(--font-sans)">{total}</text>
          <text x={cx} y={cy + 14} textAnchor="middle" fontSize="11" fill="var(--fg-3)" fontFamily="var(--font-sans)">total</text>
        </svg>
        <ul className="wd-donut-legend">
          {data.map((seg, i) => (
            <li key={i}>
              <span className="wd-donut-dot" style={{background: seg.color}}></span>
              <span className="wd-donut-lbl">{seg.label}</span>
              <span className="wd-donut-val">{seg.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Object.assign(window, { LineChart, BarChart, DonutChart });
