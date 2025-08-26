'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { School, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { pseudoSignIn } = useAuth();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter an email address.');
      return;
    }
    // Very basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address.');
        return;
    }
    setError('');

    const hasNumber = /\d/.test(email);
    const role = hasNumber ? 'student' : 'professor';
    
    pseudoSignIn(email, role);

    if (role === 'student') {
      router.push('/student-dashboard');
    } else {
      router.push('/professor-dashboard');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background items-center justify-center p-4">
       <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <div className="flex items-center gap-2 text-2xl font-bold text-primary justify-center mb-2">
                <School className="w-8 h-8" />
                <span>ProfTrack</span>
            </div>
          <CardTitle className="text-2xl">Welcome!</CardTitle>
          <CardDescription>
            Enter your university email to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContinue} className="space-y-4">
            <div className="space-y-2">
                <Input
                    id="email"
                    type="email"
                    placeholder="you@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 text-base"
                />
                <p className="text-xs text-muted-foreground px-2">
                    Student emails have numbers (e.g., student123@...). Professor emails do not.
                </p>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" size="lg">
              Continue
              <ArrowRight className="ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
