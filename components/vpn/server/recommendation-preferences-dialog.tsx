"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Settings } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RecommendationPreferencesDialogProps {
  weights: {
    latency: number;
    load: number;
    location: number;
    protocol: number;
  };
  prioritizeProtocol?: "wireguard" | "openvpn";
  onUpdateWeights: (weights: Partial<typeof weights>) => void;
  onUpdateProtocol: (protocol: "wireguard" | "openvpn" | undefined) => void;
}

export function RecommendationPreferencesDialog({
  weights,
  prioritizeProtocol,
  onUpdateWeights,
  onUpdateProtocol,
}: RecommendationPreferencesDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Recommendation preferences</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Recommendation Preferences</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Latency Weight</label>
              <Slider
                value={[weights.latency]}
                min={0}
                max={100}
                step={5}
                onValueChange={([value]) => onUpdateWeights({ latency: value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Server Load Weight</label>
              <Slider
                value={[weights.load]}
                min={0}
                max={100}
                step={5}
                onValueChange={([value]) => onUpdateWeights({ load: value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location Weight</label>
              <Slider
                value={[weights.location]}
                min={0}
                max={100}
                step={5}
                onValueChange={([value]) => onUpdateWeights({ location: value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Protocol Weight</label>
              <Slider
                value={[weights.protocol]}
                min={0}
                max={100}
                step={5}
                onValueChange={([value]) => onUpdateWeights({ protocol: value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Prioritize Protocol</label>
            <Select
              value={prioritizeProtocol}
              onValueChange={(value: "wireguard" | "openvpn" | undefined) => 
                onUpdateProtocol(value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="No preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wireguard">WireGuard</SelectItem>
                <SelectItem value="openvpn">OpenVPN</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}