import { format, parseISO } from "date-fns";

export const formatDate = (dateString: string): string => format(parseISO(dateString), "LLLL dd, yyyy");

export const slugifyDate = (date = new Date()): string => format(date, "yyyy-MM-dd");
