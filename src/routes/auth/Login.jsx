import { createFileRoute, redirect } from "@tanstack/react-router";
import { Button } from "antd";
import { useState } from "react";

export const Route = createFileRoute("/auth/Login")({
  validateSearch: (search) => ({
    redirect: search.redirect || "/",
  }),
  beforeLoad: ({ context, search }) => {
    console.log("root context", context);
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect });
    }
  },
  component: LoginComponent,
});

function LoginComponent() {
  const auth = Route.useRouteContext();
  const { redirect } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await auth.auth.login(username, password);
      // Navigate to the redirect URL using router navigation
      setTimeout(() => {
        navigate({ to: redirect });
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#f0a991]  to-[#1024dd]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-200"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Sign In
        </h1>
        <p className="text-center text-gray-500 text-sm mt-1 mb-6">
          Welcome back! Please login to your account.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-400 text-red-600 px-4 py-3 rounded-md text-sm text-center mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          disabled={isLoading}
          className="w-full mt-6"
          loading={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a
            href="/auth/Register"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </a>
        </p>
        <div className="p-2 rounded-md bg-orange-100">
          <p>Username: emilys</p>
          <p>password: emilyspass</p>
        </div>
      </form>
    </div>
  );
}
