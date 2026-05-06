"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const DATA = [
  { category: "Lead Gen & Customer Acquisition", posts: 16, pct: 38, color: "#3B82F6" },
  { category: "Financial Management & Cash Flow", posts: 14, pct: 33, color: "#10B981" },
  { category: "Operations & Admin Overload", posts: 6, pct: 14, color: "#8B5CF6" },
  { category: "Hiring & Staffing", posts: 6, pct: 14, color: "#F59E0B" },
];

interface TooltipPayload {
  value: number;
  name: string;
  payload: (typeof DATA)[0];
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-gray-800">{d.category}</p>
      <p className="text-gray-500 mt-1">
        <span className="font-medium text-gray-700">{d.posts} posts</span> mentioning this problem
      </p>
      <p className="text-gray-500">
        <span className="font-medium text-gray-700">{d.pct}%</span> of all problem signals
      </p>
    </div>
  );
}

export function ProblemChart() {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={DATA}
          layout="vertical"
          margin={{ top: 4, right: 72, bottom: 4, left: 8 }}
          barCategoryGap="28%"
        >
          <XAxis type="number" domain={[0, 20]} hide />
          <YAxis
            type="category"
            dataKey="category"
            width={240}
            tick={{ fontSize: 13, fill: "#374151", fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F9FAFB" }} />
          <Bar dataKey="posts" radius={[0, 6, 6, 0]}>
            {DATA.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
            <LabelList
              dataKey="pct"
              position="right"
              formatter={(v) => `${v}%`}
              style={{ fontSize: 13, fontWeight: 700, fill: "#374151" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 pl-2">
        {DATA.map((d) => (
          <div key={d.category} className="flex items-center gap-2 text-xs text-gray-600">
            <span
              className="inline-block w-3 h-3 rounded-full flex-shrink-0"
              style={{ background: d.color }}
            />
            {d.category}
          </div>
        ))}
      </div>
    </div>
  );
}
