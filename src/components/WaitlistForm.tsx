"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { type Option, BUDGET_OPTIONS } from "@/lib/options";

interface Props {
  option: Option;
}

interface FormState {
  name: string;
  email: string;
  situation: string;
  outcome: string;
  blocker: string;
  budget: string;
  notes: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  situation: "",
  outcome: "",
  blocker: "",
  budget: "",
  notes: "",
};

export function WaitlistForm({ option }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.situation) e.situation = "Please select an option";
    if (!form.outcome) e.outcome = "Please select an option";
    if (!form.blocker.trim()) e.blocker = "Please share what's held you back";
    if (!form.budget) e.budget = "Please select a budget range";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          option: option.letter,
          optionName: option.name,
          ...form,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong");
      }
      router.push("/success");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Your name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Jane Smith"
            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-offset-1 ${
              errors.name
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:border-gray-400 focus:ring-gray-200"
            }`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="jane@business.com"
            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-offset-1 ${
              errors.email
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:border-gray-400 focus:ring-gray-200"
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      {/* Q1 */}
      <RadioGroup
        label="Which best describes your current situation?"
        options={option.situations}
        value={form.situation}
        onChange={(v) => set("situation", v)}
        error={errors.situation}
        color={option.color}
      />

      {/* Q2 */}
      <RadioGroup
        label="Which best describes the outcome you're looking to achieve?"
        options={option.outcomes}
        value={form.outcome}
        onChange={(v) => set("outcome", v)}
        error={errors.outcome}
        color={option.color}
      />

      {/* Q3 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          What is the top thing that has prevented you from getting this outcome in the past?{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={3}
          value={form.blocker}
          onChange={(e) => set("blocker", e.target.value)}
          placeholder="Be as specific as you like…"
          className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition resize-none focus:ring-2 focus:ring-offset-1 ${
            errors.blocker
              ? "border-red-400 focus:ring-red-300"
              : "border-gray-300 focus:border-gray-400 focus:ring-gray-200"
          }`}
        />
        {errors.blocker && <p className="mt-1 text-xs text-red-500">{errors.blocker}</p>}
      </div>

      {/* Q4 */}
      <RadioGroup
        label="How much are you prepared to spend monthly for a solution?"
        options={BUDGET_OPTIONS}
        value={form.budget}
        onChange={(v) => set("budget", v)}
        error={errors.budget}
        color={option.color}
      />

      {/* Q5 — optional */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          What else do you want us to know?{" "}
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          rows={3}
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="Anything else that would help us build the right product for you…"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition resize-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 focus:ring-offset-1"
        />
      </div>

      {serverError && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{ background: loading ? "#9CA3AF" : option.color }}
        className="w-full rounded-lg px-6 py-3.5 text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting…" : "Join the Waitlist →"}
      </button>
    </form>
  );
}

function RadioGroup({
  label,
  options,
  value,
  onChange,
  error,
  color,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  color: string;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-700 mb-2.5">
        {label} <span className="text-red-500">*</span>
      </p>
      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex items-start gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
              value === opt
                ? "border-current bg-gray-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
            style={value === opt ? { borderColor: color } : {}}
          >
            <input
              type="radio"
              name={label}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="mt-0.5 flex-shrink-0 accent-current"
              style={{ accentColor: color }}
            />
            <span className="text-sm text-gray-700">{opt}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
