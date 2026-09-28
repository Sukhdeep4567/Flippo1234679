"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { AnimatePresence, m } from "motion/react";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { enquiry, roles } from "@/content/site";
import type { EnquiryData, EnquiryInput } from "@/lib/enquiry";
import { SELECT_ROLE_EVENT } from "@/lib/events";
import { buttonClasses, ButtonChip } from "@/components/ui/Button";
import { cx } from "@/lib/cx";

const copy = enquiry.form;
const f = copy.fields;

type Status = "idle" | "submitting" | "success" | "error";

/** zod + the schema load on first validation, not with the page. */
const lazyResolver: Resolver<EnquiryInput, unknown, EnquiryData> = async (
  values,
  context,
  options,
) => {
  const { enquiryResolver } = await import("@/lib/enquiry-resolver");
  return enquiryResolver(values, context, options);
};

const inputClass =
  "w-full rounded-2xl border border-line bg-white px-4 text-[16px] text-ink placeholder:text-[#8a8a8a] transition-[border-color,box-shadow] duration-200 outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 aria-[invalid=true]:border-[#C0362C] aria-[invalid=true]:focus:ring-[#C0362C]/15";

function Field({
  id,
  label,
  required,
  optional,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required && (
          <span aria-hidden="true" className="text-accent">
            {" "}
            {copy.requiredMark}
          </span>
        )}
        {optional && <span className="font-medium text-muted"> {optional}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-[#C0362C]">
          {error}
        </p>
      )}
    </div>
  );
}

export function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const successRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EnquiryInput, unknown, EnquiryData>({
    resolver: lazyResolver,
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      message: "",
      consent: false,
      website: "",
    },
    mode: "onTouched",
  });

  // Pre-select a role when picked in "Who we help".
  useEffect(() => {
    const onSelect = (e: Event) => {
      const role = (e as CustomEvent<string>).detail;
      setValue("role", role, { shouldDirty: true });
      setStatus((s) => (s === "success" ? "idle" : s));
    };
    window.addEventListener(SELECT_ROLE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_ROLE_EVENT, onSelect);
  }, [setValue]);

  // Move focus to the confirmation so screen-reader and keyboard users hear it.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const onSubmit = async (data: EnquiryData) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const describedBy = (name: keyof EnquiryInput) =>
    errors[name] ? `enq-${name}-error` : undefined;

  return (
    <div className="relative rounded-[28px] bg-surface p-6 sm:p-8 md:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <m.div
            key="success"
            ref={successRef}
            tabIndex={-1}
            role="status"
            className="flex min-h-[420px] flex-col items-center justify-center gap-5 text-center outline-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <span className="grid size-16 place-items-center rounded-full bg-accent text-white">
              <CircleCheck className="size-8" aria-hidden="true" />
            </span>
            <p className="max-w-[26ch] text-2xl leading-snug font-bold tracking-[-0.01em]">
              {copy.success}
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="text-sm font-semibold text-accent underline-offset-4 hover:underline"
            >
              {copy.sendAnother}
            </button>
          </m.div>
        ) : (
          <m.form
            key="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-5 sm:grid-cols-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-labelledby="enquiry-form-title"
          >
            <h3
              id="enquiry-form-title"
              className="text-xl font-bold tracking-[-0.01em] sm:col-span-2"
            >
              {copy.title}
            </h3>

            <Field id="enq-name" label={f.name.label} required error={errors.name?.message}>
              <input
                id="enq-name"
                type="text"
                autoComplete="name"
                placeholder={f.name.placeholder}
                className={cx(inputClass, "h-14")}
                aria-invalid={!!errors.name}
                aria-describedby={describedBy("name")}
                aria-required="true"
                {...register("name")}
              />
            </Field>

            <Field id="enq-email" label={f.email.label} required error={errors.email?.message}>
              <input
                id="enq-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder={f.email.placeholder}
                className={cx(inputClass, "h-14")}
                aria-invalid={!!errors.email}
                aria-describedby={describedBy("email")}
                aria-required="true"
                {...register("email")}
              />
            </Field>

            <Field
              id="enq-company"
              label={f.company.label}
              required
              error={errors.company?.message}
            >
              <input
                id="enq-company"
                type="text"
                autoComplete="organization"
                placeholder={f.company.placeholder}
                className={cx(inputClass, "h-14")}
                aria-invalid={!!errors.company}
                aria-describedby={describedBy("company")}
                aria-required="true"
                {...register("company")}
              />
            </Field>

            <Field id="enq-role" label={f.role.label}>
              <div className="relative">
                <select
                  id="enq-role"
                  className={cx(inputClass, "h-14 appearance-none pr-11")}
                  {...register("role")}
                >
                  <option value="">{f.role.placeholder}</option>
                  {roles.map((r) => (
                    <option key={r.title} value={r.title}>
                      {r.title}
                    </option>
                  ))}
                  <option value={f.role.otherLabel}>{f.role.otherLabel}</option>
                </select>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted"
                >
                  <path
                    d="M5 7.5 10 12.5 15 7.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Field>

            <Field
              id="enq-message"
              label={f.message.label}
              optional={f.message.optional}
              className="sm:col-span-2"
            >
              <textarea
                id="enq-message"
                rows={4}
                placeholder={f.message.placeholder}
                className={cx(inputClass, "min-h-32 resize-y py-3.5")}
                {...register("message")}
              />
            </Field>

            {/* Honeypot — hidden from people and assistive tech */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="enq-website">{f.honeypot}</label>
              <input
                id="enq-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label
                htmlFor="enq-consent"
                className="flex cursor-pointer items-start gap-3 text-[15px]"
              >
                <input
                  id="enq-consent"
                  type="checkbox"
                  className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-md accent-[var(--accent)]"
                  aria-invalid={!!errors.consent}
                  aria-describedby={describedBy("consent")}
                  aria-required="true"
                  {...register("consent")}
                />
                <span>
                  {f.consent.label}
                  <span aria-hidden="true" className="text-accent">
                    {" "}
                    {copy.requiredMark}
                  </span>
                </span>
              </label>
              {errors.consent?.message && (
                <p id="enq-consent-error" className="text-sm font-medium text-[#C0362C]">
                  {errors.consent.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4 sm:col-span-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className={cx(
                  buttonClasses({}),
                  "w-full justify-between disabled:cursor-wait disabled:opacity-80 sm:w-fit sm:justify-center",
                )}
              >
                <span>{status === "submitting" ? copy.submitting : copy.submit}</span>
                {status === "submitting" ? (
                  <span className="grid size-11 place-items-center rounded-full bg-white text-ink">
                    <LoaderCircle className="size-[18px] animate-spin" aria-hidden="true" />
                  </span>
                ) : (
                  <ButtonChip />
                )}
              </button>
              <div aria-live="polite">
                {status === "error" && (
                  <p className="text-sm font-medium text-[#C0362C]">{copy.error}</p>
                )}
              </div>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
