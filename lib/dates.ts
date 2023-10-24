import { parse, format } from "date-fns";

export function formatedPublishedAt(date: string): string {
  return format(publishedAt(date), "MMMM dd, yyyy");
}

export function publishedAt(date: string): Date {
  return parse(date, "yyyy-MM-dd", new Date());
}
