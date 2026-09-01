import React, { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const user = useAuthStore((s) => s.user);
  const allowed = useAuthStore((s) => s.allowed);
  const loading = useAuthStore((s) => s.loading);
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    initialize();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return user && allowed ? <Dashboard /> : <Login />;
}

export default App;