import { useState } from 'react';
import { clsx } from 'clsx';
import { Hash, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

type TableRow = {
  multiplier: number;
  result: number;
};

function generateTable(base: number, limit: number): TableRow[] {
  return Array.from({ length: limit }, (_, i) => ({
    multiplier: i + 1,
    result: base * (i + 1),
  }));
}

export default function TablePage() {
  const BASE = 732;
  const [limit, setLimit] = useState<number>(20);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [highlightEven, setHighlightEven] = useState<boolean>(false);

  const rows = generateTable(BASE, limit);

  const handleLimitChange = (delta: number) => {
    setLimit((prev) => Math.max(1, Math.min(100, prev + delta)));
  };

  const formatNumber = (n: number): string => n.toLocaleString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#051a0f] via-[#071f12] to-[#03120a] flex flex-col items-center py-10 px-4">
      {/* Header */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
            <Hash size={20} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Multiplication Table
          </h1>
        </div>
        <p className="text-green-900/60 text-sm ml-13" style={{color:'#86efac99'}}>
          Showing the multiplication table of{' '}
          <span className="text-green-400 font-bold">732</span>
        </p>
      </div>

      {/* Controls */}
      <div className="w-full max-w-2xl mb-6 flex flex-wrap items-center gap-4">
        {/* Row limit control */}
        <div className="flex items-center gap-2 bg-white/5 border border-green-900/40 rounded-xl px-4 py-2">
          <span className="text-green-400/70 text-sm">Rows:</span>
          <button
            onClick={() => handleLimitChange(-5)}
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-green-500/30 flex items-center justify-center transition-colors"
            aria-label="Decrease rows"
          >
            <ChevronDown size={14} className="text-green-300" />
          </button>
          <span className="text-white font-bold font-mono-custom w-8 text-center">{limit}</span>
          <button
            onClick={() => handleLimitChange(5)}
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-green-500/30 flex items-center justify-center transition-colors"
            aria-label="Increase rows"
          >
            <ChevronUp size={14} className="text-green-300" />
          </button>
        </div>

        {/* Toggle highlight */}
        <button
          onClick={() => setHighlightEven((v) => !v)}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all',
            highlightEven
              ? 'bg-green-500/20 border-green-500/50 text-green-300'
              : 'bg-white/5 border-green-900/30 text-green-400/60 hover:text-green-200 hover:border-green-700/40'
          )}
        >
          <Sparkles size={14} />
          Highlight Even Results
        </button>

        {/* Quick jumps */}
        <div className="flex items-center gap-2 ml-auto">
          {[10, 20, 50, 100].map((n) => (
            <button
              key={n}
              onClick={() => setLimit(n)}
              className={clsx(
                'w-9 h-8 rounded-lg text-xs font-bold transition-all',
                limit === n
                  ? 'bg-green-600 text-white shadow-md shadow-green-500/30'
                  : 'bg-white/5 text-green-400/60 hover:bg-green-900/30 hover:text-green-200 border border-green-900/30'
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Table card */}
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-green-900/40 shadow-2xl shadow-black/50">
        {/* Table header */}
        <div className="grid grid-cols-3 bg-gradient-to-r from-green-900/60 to-emerald-900/60 border-b border-green-900/40">
          <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-green-400">#</div>
          <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-green-400 text-center">Expression</div>
          <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-green-400 text-right">Result</div>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-green-900/20">
          {rows.map((row) => {
            const isHovered = hoveredRow === row.multiplier;
            const isEven = row.result % 2 === 0;
            const isHighlighted = highlightEven && isEven;

            return (
              <div
                key={row.multiplier}
                onMouseEnter={() => setHoveredRow(row.multiplier)}
                onMouseLeave={() => setHoveredRow(null)}
                className={clsx(
                  'grid grid-cols-3 transition-all duration-150 cursor-default',
                  isHovered
                    ? 'bg-green-500/15'
                    : isHighlighted
                    ? 'bg-emerald-500/10'
                    : row.multiplier % 2 === 0
                    ? 'bg-white/[0.02]'
                    : 'bg-transparent'
                )}
              >
                {/* Index */}
                <div className="px-6 py-3.5 flex items-center">
                  <span
                    className={clsx(
                      'w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono-custom transition-all',
                      isHovered
                        ? 'bg-green-500 text-white shadow-md shadow-green-500/40'
                        : 'bg-white/8 text-green-700'
                    )}
                  >
                    {row.multiplier}
                  </span>
                </div>

                {/* Expression */}
                <div className="px-6 py-3.5 flex items-center justify-center">
                  <span
                    className={clsx(
                      'font-mono-custom text-sm transition-colors',
                      isHovered ? 'text-green-200' : 'text-slate-300'
                    )}
                  >
                    <span className="text-green-400 font-bold">732</span>
                    <span className="text-green-700/80 mx-1.5">×</span>
                    <span className="text-teal-400 font-bold">{row.multiplier}</span>
                  </span>
                </div>

                {/* Result */}
                <div className="px-6 py-3.5 flex items-center justify-end">
                  <span
                    className={clsx(
                      'font-mono-custom font-bold text-base transition-all',
                      isHovered
                        ? 'text-white scale-110'
                        : isHighlighted
                        ? 'text-emerald-300'
                        : 'text-green-400'
                    )}
                  >
                    {formatNumber(row.result)}
                  </span>
                  {isHighlighted && !isHovered && (
                    <span className="ml-2 text-emerald-400 text-xs">✦</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer summary */}
        <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-t border-green-900/40 px-6 py-4 flex items-center justify-between">
          <span className="text-green-800 text-xs" style={{color:'#4ade8099'}}>
            Showing <span className="text-green-300 font-medium">{limit}</span> rows
          </span>
          <div className="flex items-center gap-4 text-xs">
            <span style={{color:'#4ade8099'}}>
              Sum:{' '}
              <span className="text-amber-400 font-bold font-mono-custom">
                {formatNumber(rows.reduce((acc, r) => acc + r.result, 0))}
              </span>
            </span>
            <span style={{color:'#4ade8099'}}>
              Max:{' '}
              <span className="text-green-400 font-bold font-mono-custom">
                {formatNumber(rows[rows.length - 1]?.result ?? 0)}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-8 text-green-900/50 text-xs text-center" style={{color:'#166534aa'}}>
        732 = 4 × 3 × 61 &nbsp;·&nbsp; Composite number &nbsp;·&nbsp; Even
      </p>
    </div>
  );
}
