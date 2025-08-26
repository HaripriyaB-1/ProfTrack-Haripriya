import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { School, User, UserCog } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
              <School className="w-8 h-8" />
              <span>ProfTrack</span>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Welcome to ProfTrack</h1>
          <p className="text-muted-foreground text-lg md:text-xl mb-8">
            The easiest way to track your professors' status and find the optimal time to connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/login?role=student">
                <User className="mr-2" />
                Student Login
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
               <Link href="/login?role=professor">
                <UserCog className="mr-2" />
                Professor Login
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
