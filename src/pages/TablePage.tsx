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
    <div className="min-h-screen bg-gradient-to-br from-[#1a0303] via-[#250505] to-[#180202] flex flex-col items-center py-10 px-4">
      {/* Header */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/30">
            <Hash size={20} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Multiplication Table
          </h1>
        </div>
        <p className="text-sm ml-13" style={{color:'#fca5a599'}}>
          Showing the multiplication table of{' '}
          <span className="text-red-400 font-bold">732</span>
        </p>
      </div>

      {/* Controls */}
      <div className="w-full max-w-2xl mb-6 flex flex-wrap items-center gap-4">
        {/* Row limit control */}
        <div className="flex items-center gap-2 bg-white/5 border border-red-900/40 rounded-xl px-4 py-2">
          <span className="text-red-400/70 text-sm">Rows:</span>
          <button
            onClick={() => handleLimitChange(-5)}
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-red-500/30 flex items-center justify-center transition-colors"
            aria-label="Decrease rows"
          >
            <ChevronDown size={14} className="text-red-300" />
          </button>
          <span className="text-white font-bold font-mono-custom w-8 text-center">{limit}</span>
          <button
            onClick={() => handleLimitChange(5)}
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-red-500/30 flex items-center justify-center transition-colors"
            aria-label="Increase rows"
          >
            <ChevronUp size={14} className="text-red-300" />
          </button>
        </div>

        {/* Toggle highlight */}
        <button
          onClick={() => setHighlightEven((v) => !v)}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all',
            highlightEven
              ? 'bg-red-500/20 border-red-500/50 text-red-300'
              : 'bg-white/5 border-red-900/30 text-red-400/60 hover:text-red-200 hover:border-red-700/40'
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
                  ? 'bg-red-600 text-white shadow-md shadow-red-500/30'
                  : 'bg-white/5 text-red-400/60 hover:bg-red-900/30 hover:text-red-200 border border-red-900/30'
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Table card */}
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-red-900/40 shadow-2xl shadow-black/50">
        {/* Table header */}
        <div className="grid grid-cols-3 bg-gradient-to-r from-red-900/60 to-red-800/60 border-b border-red-900/40">
          <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-red-400">#</div>
          <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-red-400 text-center">Expression</div>
          <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-red-400 text-right">Result</div>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-red-900/20">
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
                    ? 'bg-red-500/15'
                    : isHighlighted
                    ? 'bg-red-500/10'
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
                        ? 'bg-red-500 text-white shadow-md shadow-red-500/40'
                        : 'bg-white/8 text-red-700'
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
                      isHovered ? 'text-red-200' : 'text-slate-300'
                    )}
                  >
                    <span className="text-red-400 font-bold">732</span>
                    <span className="text-red-700/80 mx-1.5">×</span>
                    <span className="text-orange-400 font-bold">{row.multiplier}</span>
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
                        ? 'text-red-300'
                        : 'text-red-400'
                    )}
                  >
                    {formatNumber(row.result)}
                  </span>
                  {isHighlighted && !isHovered && (
                    <span className="ml-2 text-red-400 text-xs">✦</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer summary */}
        <div className="bg-gradient-to-r from-red-900/40 to-red-800/40 border-t border-red-900/40 px-6 py-4 flex items-center justify-between">
          <span className="text-xs" style={{color:'#f87171aa'}}>
            Showing <span className="text-red-300 font-medium">{limit}</span> rows
          </span>
          <div className="flex items-center gap-4 text-xs">
            <span style={{color:'#f87171aa'}}>
              Sum:{' '}
              <span className="text-amber-400 font-bold font-mono-custom">
                {formatNumber(rows.reduce((acc, r) => acc + r.result, 0))}
              </span>
            </span>
            <span style={{color:'#f87171aa'}}>
              Max:{' '}
              <span className="text-red-400 font-bold font-mono-custom">
                {formatNumber(rows[rows.length - 1]?.result ?? 0)}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-8 text-xs text-center" style={{color:'#7f1d1daa'}}>
        732 = 4 × 3 × 61 &nbsp;·&nbsp; Composite number &nbsp;·&nbsp; Even
      </p>
    </div>
  );
}
