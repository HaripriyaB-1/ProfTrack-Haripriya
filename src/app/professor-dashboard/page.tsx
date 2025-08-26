'use client';

import { useState, useEffect } from 'react';
import { initialProfessors } from '@/data/professors';
import type { Professor } from '@/types';
import ProfessorCard from '@/components/professors/professor-card';
import Header from '@/components/layout/header';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfessorDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  // Find the professor that matches the logged-in user's email
  // In a real app, you'd fetch this from a database based on the user's ID
  const [professor, setProfessor] = useState<Professor | undefined>(
    initialProfessors.find(p => p.email === user?.email)
  );

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?role=professor');
    }
    // If the user is loaded and is not a professor in our static data, redirect
    if (!loading && user && !professor) {
       // For demo purposes, we'll just assign the first professor to the first signed up professor user
       const firstProf = initialProfessors[0];
       if(user.email) {
          firstProf.email = user.email;
          setProfessor(firstProf);
       } else {
        router.push('/');
       }
    }
  }, [user, loading, router, professor]);

  const handleStatusChange = (professorId: string, newStatus: Professor['status']) => {
    if (professor && professor.id === professorId) {
      setProfessor({ ...professor, status: newStatus, lastUpdated: new Date().toISOString() });
      // Here you would also update the database
    }
  };
  
  if (loading || !user || !professor) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-6">Professor Dashboard</h1>
          <p className="text-muted-foreground mb-8">
            Welcome back, {professor.name}. Manage your status and details here.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProfessorCard
              key={professor.id}
              professor={professor}
              onStatusChange={handleStatusChange}
              isStudentView={false}
            />
            <Card>
                <CardHeader>
                    <CardTitle>Your Details</CardTitle>
                    <CardDescription>This is your public information visible to students.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p><strong>Email:</strong> {professor.email}</p>
                    <p><strong>Department:</strong> {professor.department}</p>
                    <p><strong>Cabin:</strong> {professor.cabinLocation}</p>
                    <p><strong>Phone:</strong> {professor.phone}</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
