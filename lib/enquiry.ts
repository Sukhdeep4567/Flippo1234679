// zod/mini: same validation as full zod, a fraction of the client bundle.
import * as z from "zod/mini";
import { enquiry } from "@/content/site";

const f = enquiry.form.fields;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Shared by the client form and the /api/enquiry route handler. */
export const enquirySchema = z.object({
  name: z.string().check(z.trim(), z.minLength(1, f.name.required), z.maxLength(120)),
  email: z
    .string()
    .check(
      z.trim(),
      z.minLength(1, f.email.required),
      z.maxLength(200),
      z.regex(EMAIL, f.email.invalid),
    ),
  company: z.string().check(z.trim(), z.minLength(1, f.company.required), z.maxLength(160)),
  role: z.optional(z.string().check(z.trim(), z.maxLength(80))),
  message: z.optional(z.string().check(z.trim(), z.maxLength(4000))),
  consent: z.boolean().check(z.refine((v) => v, f.consent.required)),
  /** Honeypot: real visitors never see or fill this. */
  website: z.optional(z.string().check(z.maxLength(0))),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryData = z.output<typeof enquirySchema>;

export const flattenEnquiryError = z.flattenError;
