"use client";

import type { SignupField } from "@/types/blobert";

type MouthInputProps = {
  field: SignupField;
  value: string;
  error: string | null;
  disabled: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function MouthInput({
  field,
  value,
  error,
  disabled,
  onChange,
  onSubmit,
}: MouthInputProps) {
  return (
    <form
      className="flex w-full flex-col gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex items-center gap-2">
        <input
          className="min-w-0 flex-1 rounded-full border-2 border-white/30 bg-white px-4 py-3 text-sm font-black text-ink outline-none ring-lime transition focus:ring-4 sm:text-base"
          type={field.inputType}
          value={value}
          disabled={disabled}
          placeholder={field.placeholder}
          aria-label={field.label}
          onChange={(event) => onChange(event.target.value)}
        />
        <button
          className="rounded-full bg-lime px-4 py-3 text-sm font-black text-ink shadow-md transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={disabled}
        >
          Feed
        </button>
      </div>
      {error ? <p className="px-2 text-xs font-black text-[#ffcfde]">{error}</p> : null}
    </form>
  );
}
