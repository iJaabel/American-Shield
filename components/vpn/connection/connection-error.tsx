"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { ConnectionError } from "../types";

interface ConnectionErrorProps {
  error: ConnectionError;
  onRetry?: () => void;
}

export function ConnectionError({ error, onRetry }: ConnectionErrorProps) {
  const getSolutionMessage = (code: string) => {
    switch (code) {
      case "CONNECTION_TIMEOUT":
        return "Try selecting a different server or check your internet connection.";
      case "AUTH_ERROR":
        return "Please sign out and sign back in to refresh your credentials.";
      case "NETWORK_ERROR":
        return "Check your internet connection and try again.";
      default:
        return "Try again or contact support if the issue persists.";
    }
  };

  return (
    <Alert 
      variant="destructive"
      role="alert"
      aria-live="assertive"
    >
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Connection Error</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>{error.message}</p>
        <p className="text-sm">{getSolutionMessage(error.code)}</p>
        {onRetry && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry}
            className="mt-2"
          >
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}