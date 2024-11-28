import { Shield } from "lucide-react";
import { CardTitle, CardDescription } from "@/components/ui/card";

interface StatusHeaderProps {
  isConnected: boolean;
}

export function StatusHeader({ isConnected }: StatusHeaderProps) {
  return (
    <div className="flex items-center space-x-4">
      <Shield 
        className={`h-8 w-8 ${isConnected ? "text-green-500" : "text-muted-foreground"}`}
        aria-hidden="true"
      />
      <div>
        <CardTitle>VPN Connection Status</CardTitle>
        <CardDescription>
          {isConnected ? "Connected and Protected" : "Not Connected"}
        </CardDescription>
      </div>
    </div>
  );
}