import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  if (!searchParams.session_id) {
    redirect('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Payment Successful!</CardTitle>
          <CardDescription>
            Thank you for subscribing to American Shield VPN
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Your subscription has been activated. You can now start using American
            Shield VPN to protect your online privacy.
          </p>
          <div className="flex justify-center">
            <Link href="/">
              <Button>Return to Homepage</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}