// src/pages/Login.jsx
import React, { useMemo, useState } from "react";
import { SignIn, useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mode, setMode] = useState("user"); // "user" | "admin"
  const [adminPasscode, setAdminPasscode] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminUser, setAdminUser] = useState("");
  const [adminPwd, setAdminPwd] = useState("");
  const [adminCredError, setAdminCredError] = useState("");

  const navigate = useNavigate();

  // Clerk state for role-based check
  const { isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();

  const userRedirectUrl = useMemo(() => "/dashboard", []);

  // Recommended: role-based admin after Clerk sign-in
  const tryAdminRedirectByRole = () => {
    setAdminError("");
    if (!isLoaded || !isSignedIn) {
      setAdminError("Please sign in first to verify admin access.");
      return;
    }
    const role = user?.publicMetadata?.role;
    if (role === "admin") {
      navigate("/admin");
    } else {
      setAdminError("Admin access denied. Contact support if this is unexpected.");
    }
  };

  // Demo-only: hardcoded admin credentials (username=admin, password=123)
  const onSubmitAdminCreds = (e) => {
    e.preventDefault();
    setAdminCredError("");
    if (adminUser === "admin" && adminPwd === "123") {
      navigate("/admin");
    } else {
      setAdminCredError("Invalid admin credentials.");
    }
  };

  // Optional: passcode gate (separate admin system)
  const onSubmitAdminPasscode = (e) => {
    e.preventDefault();
    setAdminError("");
    const expected = import.meta.env.VITE_ADMIN_PASSCODE || "";
    if (!expected) {
      setAdminError("Admin passcode is not configured.");
      return;
    }
    if (adminPasscode === expected) {
      navigate("/admin");
    } else {
      setAdminError("Invalid admin passcode.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="hidden md:flex flex-col justify-center bg-white rounded-xl shadow p-8">
          <h1 className="text-3xl font-semibold mb-3">Welcome back</h1>
          <p className="text-gray-600">
            Sign in to continue to BharatDarshan. Use the user tab for a regular account, or the admin tab for administrative access.
          </p>
          <div className="mt-6 flex space-x-2">
            <button
              onClick={() => setMode("user")}
              className={`px-4 py-2 rounded border ${mode === "user" ? "bg-black text-white" : "bg-white text-black"}`}
            >
              User
            </button>
            <button
              onClick={() => setMode("admin")}
              className={`px-4 py-2 rounded border ${mode === "admin" ? "bg-black text-white" : "bg-white text-black"}`}
            >
              Admin
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 md:p-8">
          <div className="md:hidden mb-6 flex space-x-2">
            <button
              onClick={() => setMode("user")}
              className={`px-4 py-2 rounded border ${mode === "user" ? "bg-black text-white" : "bg-white text-black"}`}
            >
              User
            </button>
            <button
              onClick={() => setMode("admin")}
              className={`px-4 py-2 rounded border ${mode === "admin" ? "bg-black text-white" : "bg-white text-black"}`}
            >
              Admin
            </button>
          </div>

          {mode === "user" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">User Sign In</h2>
              <SignIn
                routing="hash"
                afterSignInUrl={userRedirectUrl}
                afterSignUpUrl={userRedirectUrl}
                appearance={{
                  variables: { colorPrimary: "#ef4444", borderRadius: "0.75rem" },
                }}
              />
            </div>
          )}

          {mode === "admin" && (
            <div className="space-y-10">
              {/* A) Recommended: Clerk role-based */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Admin (role-based)</h2>
                <p className="text-gray-600 mb-4">
                  Sign in with Clerk first, then verify admin role to enter the admin panel.
                </p>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={tryAdminRedirectByRole}
                    className="px-4 py-2 rounded bg-black text-white"
                  >
                    Continue to Admin
                  </button>
                  <span className="text-sm text-gray-500">
                    Requires user.public_metadata.role = "admin"
                  </span>
                </div>
                {adminError && <p className="text-sm text-red-600 mt-2">{adminError}</p>}
              </div>

              {/* B) Demo-only: hardcoded username/password */}
              <div className="border-t pt-6">
                <h3 className="text-md font-semibold mb-2">Admin (demo credentials)</h3>
                <p className="text-gray-600 mb-4">
                  For quick demos only. Username is “admin” and password is “123”.
                </p>
                <form onSubmit={onSubmitAdminCreds} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Admin username"
                    className="w-full border rounded px-3 py-2"
                    value={adminUser}
                    onChange={(e) => setAdminUser(e.target.value)}
                    autoComplete="username"
                  />
                  <input
                    type="password"
                    placeholder="Admin password"
                    className="w-full border rounded px-3 py-2"
                    value={adminPwd}
                    onChange={(e) => setAdminPwd(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button type="submit" className="w-full px-4 py-2 rounded bg-red-600 text-white">
                    Enter Admin
                  </button>
                </form>
                {adminCredError && <p className="text-sm text-red-600 mt-2">{adminCredError}</p>}
              </div>

              {/* C) Optional passcode gate */}
              <div className="border-t pt-6">
                <h3 className="text-md font-semibold mb-2">Admin (passcode)</h3>
                <p className="text-gray-600 mb-4">
                  Alternative simple gate if using a separate admin-only panel.
                </p>
                <form onSubmit={onSubmitAdminPasscode} className="space-y-3">
                  <input
                    type="password"
                    placeholder="Enter admin passcode"
                    className="w-full border rounded px-3 py-2"
                    value={adminPasscode}
                    onChange={(e) => setAdminPasscode(e.target.value)}
                  />
                  <button type="submit" className="w-full px-4 py-2 rounded bg-red-600 text-white">
                    Enter Admin
                  </button>
                </form>
                {adminError && <p className="text-sm text-red-600 mt-2">{adminError}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
