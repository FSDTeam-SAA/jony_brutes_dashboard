import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router";
import { router } from "./routes/route";
import Dashboard from "./dashboard";
import { AuthProvider } from "./components/context/AuthContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}>
          <Dashboard />
          <Toaster />
        </RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
