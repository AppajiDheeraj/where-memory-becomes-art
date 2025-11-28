import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RocketIcon } from "lucide-react";
import Link from "next/link";

export const DashboardTrial = () => {
    // Dummy data
    const data = {
        agentCount: 1,
        maxFreeAgents: 15,
    };

    const { agentCount, maxFreeAgents } = data;

    return (
        <div className="border border-border/10 rounded-lg bg-white/5 flex flex-col gap-y-2">
            <div className="p-3 flex flex-col gap-y-4">
                <div className="flex items-center gap-2">
                    <RocketIcon className="size-4 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground">Beta Access</p>
                </div>
                <div className="flex flex-col gap-y-2 text-muted-foreground">
                    <p className="text-xs">
                        {agentCount}/{maxFreeAgents} Mangas
                    </p>
                    <Progress value={(agentCount / maxFreeAgents) * 100} />
                </div>
            </div>
            <Button
                asChild
                className="bg-transparent border-t border-border/80 hover:bg-white/10 rounded-t-none text-foreground"
            >
                <Link href="/upgrade">
                    Upgrade
                </Link>
            </Button>
        </div>
    )
}