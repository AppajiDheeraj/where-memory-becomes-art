import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { DashboardNav } from "@/modules/dashboard/ui/components/dashboard-navbar";
import KeyboardShortcutsProvider from "@/components/keyboard-shortcuts-provider";

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div>
            <KeyboardShortcutsProvider>
            <SidebarProvider>
                <DashboardSidebar />
                <main className="flex flex-col min-h-screen w-screen bg-muted">
                    <DashboardNav />
                    {children}
                </main>
            </SidebarProvider>
            </KeyboardShortcutsProvider>
        </div>
    );
}

export default Layout;