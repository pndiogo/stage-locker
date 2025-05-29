import type { AnyRouteMatch } from "@tanstack/react-router";

function generatePageTitle(title?: string) {
  if (!title) {
    return "Stage Locker";
  }

  if (title.endsWith("Stage Locker")) {
    return title;
  }

  return `${title} | Stage Locker`;
}

export function generatePageMeta(meta?: {
  title?: string;
  description?: string;
}): AnyRouteMatch["meta"] {
  return [
    { title: generatePageTitle(meta?.title) },
    { name: "description", content: meta?.description || "Web application for managing everyday tasks" },
  ];
}
