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
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center shadow-sm">
            <Hash size={20} className="text-blue-500" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-900">
            Multiplication Table
          </h1>
        </div>
        <p className="text-sm ml-13 text-blue-400">
          Showing the multiplication table of{' '}
          <span className="text-blue-700 font-bold">732</span>
        </p>
      </div>

      {/* Controls */}
      <div className="w-full max-w-2xl mb-6 flex flex-wrap items-center gap-4">
        {/* Row limit control */}
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-2">
          <span className="text-blue-400 text-sm">Rows:</span>
          <button
            onClick={() => handleLimitChange(-5)}
            className="w-7 h-7 rounded-lg bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors"
            aria-label="Decrease rows"
          >
            <ChevronDown size={14} className="text-blue-500" />
          </button>
          <span className="text-blue-800 font-bold font-mono-custom w-8 text-center">{limit}</span>
          <button
            onClick={() => handleLimitChange(5)}
            className="w-7 h-7 rounded-lg bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors"
            aria-label="Increase rows"
          >
            <ChevronUp size={14} className="text-blue-500" />
          </button>
        </div>

        {/* Toggle highlight */}
        <button
          onClick={() => setHighlightEven((v) => !v)}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all',
            highlightEven
              ? 'bg-blue-100 border-blue-400 text-blue-700'
              : 'bg-white border-blue-200 text-blue-400 hover:text-blue-600 hover:border-blue-300'
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
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-blue-50 text-blue-400 hover:bg-blue-100 hover:text-blue-700 border border-blue-200'
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Table card */}
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-blue-200 shadow-lg shadow-blue-100">
        {/* Table header */}
        <div className="grid grid-cols-3 bg-blue-100 border-b border-blue-200">
          <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-blue-500">#</div>
          <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-blue-500 text-center">Expression</div>
          <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-blue-500 text-right">Result</div>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-blue-100">
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
                    ? 'bg-blue-50'
                    : isHighlighted
                    ? 'bg-blue-50/60'
                    : 'bg-white'
                )}
              >
                {/* Index */}
                <div className="px-6 py-3.5 flex items-center">
                  <span
                    className={clsx(
                      'w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono-custom transition-all',
                      isHovered
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-400'
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
                      isHovered ? 'text-blue-800' : 'text-blue-500'
                    )}
                  >
                    <span className="text-blue-700 font-bold">732</span>
                    <span className="text-blue-300 mx-1.5">×</span>
                    <span className="text-blue-500 font-bold">{row.multiplier}</span>
                  </span>
                </div>

                {/* Result */}
                <div className="px-6 py-3.5 flex items-center justify-end">
                  <span
                    className={clsx(
                      'font-mono-custom font-bold text-base transition-all',
                      isHovered
                        ? 'text-blue-900 scale-110'
                        : isHighlighted
                        ? 'text-blue-600'
                        : 'text-blue-700'
                    )}
                  >
                    {formatNumber(row.result)}
                  </span>
                  {isHighlighted && !isHovered && (
                    <span className="ml-2 text-blue-300 text-xs">✦</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer summary */}
        <div className="bg-blue-100 border-t border-blue-200 px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-blue-400">
            Showing <span className="text-blue-600 font-medium">{limit}</span> rows
          </span>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-blue-400">
              Sum:{' '}
              <span className="text-blue-700 font-bold font-mono-custom">
                {formatNumber(rows.reduce((acc, r) => acc + r.result, 0))}
              </span>
            </span>
            <span className="text-blue-400">
              Max:{' '}
              <span className="text-blue-700 font-bold font-mono-custom">
                {formatNumber(rows[rows.length - 1]?.result ?? 0)}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-8 text-xs text-center text-blue-300">
        732 = 4 × 3 × 61 &nbsp;·&nbsp; Composite number &nbsp;·&nbsp; Even
      </p>
    </div>
  );
}
