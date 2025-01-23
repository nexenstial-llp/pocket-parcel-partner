import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => {
    // Redirect logic
    window.location.replace("/home");
    return null;
  },
});
