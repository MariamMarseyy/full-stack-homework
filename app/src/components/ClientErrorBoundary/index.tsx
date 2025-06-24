"use client";

import ErrorBoundary from "./ErrorBoundary";

const ClientErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export default ClientErrorBoundary;
