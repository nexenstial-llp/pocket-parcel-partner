import { useContext } from "react";
import { AuthContext } from "./authContext.js";

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be inside AuthProvider");
  }
  return context;
}
