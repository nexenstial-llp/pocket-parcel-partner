// src/routes/index.jsx
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (context.auth?.isAuthenticated) {
      throw redirect({ to: "/home" });
    } else {
      throw redirect({ to: "/auth/login" });
    }
  },
});
