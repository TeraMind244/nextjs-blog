import { format } from "date-fns";

export const formatDate = (date = Date.now()): string => format(date, "LLLL dd, yyyy");

export const formatHtmlDate = (date = Date.now()): string => format(date, "yyyy-MM-dd");
