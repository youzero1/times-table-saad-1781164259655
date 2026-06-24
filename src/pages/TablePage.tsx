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
    <div className="min-h-screen bg-red-50 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-300 flex items-center justify-center shadow-sm">
            <Hash size={20} className="text-red-600" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-red-900">
            Multiplication Table
          </h1>
        </div>
        <p className="text-sm ml-13 text-red-500">
          Showing the multiplication table of{' '}
          <span className="text-red-800 font-bold">732</span>
        </p>
      </div>

      {/* Controls */}
      <div className="w-full max-w-2xl mb-6 flex flex-wrap items-center gap-4">
        {/* Row limit control */}
        <div className="flex items-center gap-2 bg-red-50 border border-red-300 rounded-xl px-4 py-2">
          <span className="text-red-500 text-sm">Rows:</span>
          <button
            onClick={() => handleLimitChange(-5)}
            className="w-7 h-7 rounded-lg bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
            aria-label="Decrease rows"
          >
            <ChevronDown size={14} className="text-red-600" />
          </button>
          <span className="text-red-800 font-bold font-mono-custom w-8 text-center">{limit}</span>
          <button
            onClick={() => handleLimitChange(5)}
            className="w-7 h-7 rounded-lg bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
            aria-label="Increase rows"
          >
            <ChevronUp size={14} className="text-red-600" />
          </button>
        </div>

        {/* Toggle highlight */}
        <button
          onClick={() => setHighlightEven((v) => !v)}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all',
            highlightEven
              ? 'bg-red-100 border-red-400 text-red-800'
              : 'bg-white border-red-300 text-red-500 hover:text-red-700 hover:border-red-400'
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
                  ? 'bg-red-500 text-white shadow-sm'
                  : 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 border border-red-300'
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Table card */}
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-red-300 shadow-lg shadow-red-100">
        {/* Table header */}
        <div className="grid grid-cols-3 bg-red-100 border-b border-red-300">
          <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-red-600">#</div>
          <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-red-600 text-center">Expression</div>
          <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-red-600 text-right">Result</div>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-red-100">
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
                    ? 'bg-red-50'
                    : isHighlighted
                    ? 'bg-red-50/60'
                    : 'bg-white'
                )}
              >
                {/* Index */}
                <div className="px-6 py-3.5 flex items-center">
                  <span
                    className={clsx(
                      'w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono-custom transition-all',
                      isHovered
                        ? 'bg-red-500 text-white'
                        : 'bg-red-100 text-red-500'
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
                      isHovered ? 'text-red-800' : 'text-red-600'
                    )}
                  >
                    <span className="text-red-800 font-bold">732</span>
                    <span className="text-red-400 mx-1.5">×</span>
                    <span className="text-red-600 font-bold">{row.multiplier}</span>
                  </span>
                </div>

                {/* Result */}
                <div className="px-6 py-3.5 flex items-center justify-end">
                  <span
                    className={clsx(
                      'font-mono-custom font-bold text-base transition-all',
                      isHovered
                        ? 'text-red-900 scale-110'
                        : isHighlighted
                        ? 'text-red-600'
                        : 'text-red-700'
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
        <div className="bg-red-100 border-t border-red-300 px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-red-500">
            Showing <span className="text-red-700 font-medium">{limit}</span> rows
          </span>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-red-500">
              Sum:{' '}
              <span className="text-red-800 font-bold font-mono-custom">
                {formatNumber(rows.reduce((acc, r) => acc + r.result, 0))}
              </span>
            </span>
            <span className="text-red-500">
              Max:{' '}
              <span className="text-red-800 font-bold font-mono-custom">
                {formatNumber(rows[rows.length - 1]?.result ?? 0)}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-8 text-xs text-center text-red-400">
        732 = 4 × 3 × 61 &nbsp;·&nbsp; Composite number &nbsp;·&nbsp; Even
      </p>
    </div>
  );
}
