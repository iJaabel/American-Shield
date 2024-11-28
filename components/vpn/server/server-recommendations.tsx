import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ServerStatus } from "./server-status";
import { useServerRecommendations } from "../hooks/use-server-recommendations";
import type { Server } from "../types";
import { Globe, ThumbsUp, Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ServerFeedbackDialog } from "./server-feedback-dialog";
import { useServerFeedback } from "../hooks/use-server-feedback";

interface ServerRecommendationsProps {
  servers: Server[];
  onSelectServer: (server: Server) => void;
  disabled?: boolean;
}

export function ServerRecommendations({ 
  servers, 
  onSelectServer, 
  disabled 
}: ServerRecommendationsProps) {
  const recommendations = useServerRecommendations(servers);
  const { addFeedback, getServerStats } = useServerFeedback();

  if (recommendations.length === 0) return null;

  return (
    <Card className="bg-muted/50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ThumbsUp className="h-4 w-4 text-primary" />
            <h3 className="font-medium">Recommended Servers</h3>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="text-sm text-muted-foreground">
                  Why these servers?
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Recommendations based on latency, server load, and your location</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((server, index) => {
            const stats = getServerStats(server.id);
            return (
              <div key={server.id} className="space-y-2">
                <button
                  onClick={() => !disabled && onSelectServer(server)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg bg-background hover:bg-accent transition-colors ${
                    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  }`}
                  disabled={disabled}
                >
                  <div className="flex items-center space-x-2">
                    {index === 0 && (
                      <Zap className="h-4 w-4 text-yellow-500" aria-label="Best choice" />
                    )}
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <div className="text-left">
                      <p className="font-medium">{server.name}</p>
                      <p className="text-sm text-muted-foreground">{server.location}</p>
                      {server.protocol && (
                        <p className="text-xs text-muted-foreground">
                          {server.protocol.toUpperCase()}
                        </p>
                      )}
                    </div>
                  </div>
                  <ServerStatus latency={server.latency} load={server.load} />
                </button>
                {stats && (
                  <div className="text-xs text-muted-foreground text-center">
                    Rating: {stats.averageRating.toFixed(1)}/5 ({stats.totalFeedback} reviews)
                  </div>
                )}
                <div className="flex justify-center">
                  <ServerFeedbackDialog
                    serverId={server.id}
                    serverName={server.name}
                    isRecommended={true}
                    onFeedback={(rating) => addFeedback(server.id, rating, true)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}