import "../globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import CustomProvider from "../provider";
import BaseComponent from "@/components/base/Base";
import AuthProvider from "../contex/AuthProvider";

export const metadata: Metadata = {
  title: "Connectify",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <AuthProvider>
    <CustomProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <BaseComponent>{children}</BaseComponent>
        <Toaster />
      </ThemeProvider>
    </CustomProvider>

      </AuthProvider>
  );
}