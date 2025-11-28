"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import { parseUserAgentInfo } from "@/lib/parse-user-agent";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";

interface Session {
  id: string;
  userAgent: string;
  ipAddress?: string;
  createdAt: string;
  current?: boolean;
}

export const SettingsSection = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: userProfile, isLoading, refetch } = useQuery(
    trpc.settings.getProfile.queryOptions()
  );

  const defaultValues = {
    fullName: userProfile?.name || "",
    phone: userProfile?.phone || "",
    location: userProfile?.location || "",
  };

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [sessions, setSessions] = useState<Session[]>([]);

  // Load profile
  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile.name || "");
      setPhone(userProfile.phone || "");
      setLocation(userProfile.location || "");
    }
  }, [userProfile]);

  // Load sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await authClient.listSessions();
        if (res?.data) {
          const sessionList = res.data.map((s, index): Session => ({
            id: s.token,
            userAgent: s.userAgent ?? "Unknown",
            ipAddress: s.ipAddress ?? "Unknown IP",
            createdAt: new Date(s.createdAt).toLocaleString(),
            current: index === 0,
          }));

          setSessions(sessionList);
        }
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  const updateSettings = useMutation(
    trpc.settings.updateSettings.mutationOptions({
      onSuccess: async () => {
        toast.success("Settings updated successfully");
        await refetch();
      },
      onError: (error) => {
        toast.error(`Failed to update: ${error.message}`);
      },
    })
  );

  const handleSave = () => {
    if (phone) {
      const phoneWithPrefix = phone.startsWith("+") ? phone : `+${phone}`;
      if (!isValidPhoneNumber(phoneWithPrefix)) {
        toast.error("Please enter a valid phone number.");
        return;
      }
    }

    updateSettings.mutate({
      fullName,
      phone,
      location,
    });
  };

  const handleReset = () => {
    setFullName(defaultValues.fullName);
    setPhone(defaultValues.phone);
    setLocation(defaultValues.location);
  };

  const handleRevokeSession = async (id: string) => {
    try {
      await authClient.revokeSession({ token: id });
      setSessions((prev) => prev.filter((s) => s.id !== id));
      toast.success("Session revoked.");
    } catch {
      toast.error("Failed to revoke session.");
    }
  };

  const handleForceRefresh = async () => {
    await queryClient.invalidateQueries(trpc.settings.getProfile.queryOptions());
    await refetch();
    toast.info("Profile refreshed");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold">Profile Information</CardTitle>
            <Button variant="outline" size="sm" onClick={handleForceRefresh}>
              Refresh Data
            </Button>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label>Full Name</Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Phone Number</Label>
            <PhoneInput
              country={"us"}
              enableSearch={true}
              preferredCountries={["us", "gb", "in", "ca", "au"]}
              value={phone}
              onChange={(ph) => setPhone(ph)}
              inputClass="!pl-14 !pr-3 !py-2 !w-full !rounded-md !border"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Location</Label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>

        <CardHeader>
          <CardTitle className="text-xl font-semibold">Active Sessions</CardTitle>
          <Separator />
        </CardHeader>

        <CardContent className="space-y-3">
          {sessions.length === 0 ? (
            <p className="text-muted-foreground">No sessions found.</p>
          ) : (
            sessions.map((session) => {
              const { browser, os, deviceType } = parseUserAgentInfo(session.userAgent);

              return (
                <div key={session.id} className="flex justify-between items-center border p-3 rounded-md">
                  <div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium">{browser}</p>
                      {session.current && <Badge variant="secondary">Current Session</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{os} · {deviceType} · {session.ipAddress}</p>
                  </div>

                  {!session.current && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRevokeSession(session.id)}
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
};
