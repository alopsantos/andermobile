import React, { ReactNode } from "react";

import { AuthProvider } from "./auth";

interface IAuthProvider {
  children: ReactNode;
}
export function AppProvider({ children }: IAuthProvider) {
  return <AuthProvider>{children}</AuthProvider>;
}
