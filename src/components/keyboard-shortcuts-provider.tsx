"use client";

import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";

// OPTIONAL: If you have these contexts
// import { useSidebar } from "@/hooks/use-sidebar";
// import { useCommandPalette } from "@/hooks/use-command-palette";
// import { useHelp } from "@/hooks/use-help-modal";

export default function KeyboardShortcutsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Command Palette (Cmd/Ctrl + K)
  useHotkeys(
    "meta+k, ctrl+k",
    (e) => {
      e.preventDefault();
      // openCommandPalette();
      console.log("OPEN COMMAND PALETTE");
    },
    { enableOnFormTags: false }
  );

  // Toggle Sidebar (Cmd/Ctrl + B)
  useHotkeys(
    "meta+b, ctrl+b",
    (e) => {
      e.preventDefault();
      // toggleSidebar();
      console.log("TOGGLE SIDEBAR");
    },
    { enableOnFormTags: false }
  );

  // Go to Dashboard (G + D)
  useHotkeys(
    "g+d",
    (e) => {
      e.preventDefault();
      router.push("/dashboard");
    },
    { enableOnFormTags: false }
  );

  // Go to Settings (G + S)
  useHotkeys(
    "g+s",
    (e) => {
      e.preventDefault();
      router.push("/settings");
    },
    { enableOnFormTags: false }
  );

  // Help Modal (Shift + /)
  useHotkeys(
    "ctrl+m",
    (e) => {
      e.preventDefault();
      // openHelpModal();
      console.log("HELP MODAL OPEN");
    },
    { enableOnFormTags: true }
  );

  // Close overlays / command palette / dialogs (Esc)
  useHotkeys(
    "esc",
    () => {
      // closeCommandPalette();
      // closeSidebar();
      // closeHelpModal();
      console.log("ESC — CLOSE OVERLAYS");
    },
    { enableOnFormTags: true }
  );

  return <>{children}</>;
}
