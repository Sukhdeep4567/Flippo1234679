import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema } from "./enquiry";

/** Loaded on demand by the form (first validation), keeping zod off the critical path. */
export const enquiryResolver = zodResolver(enquirySchema);
