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
  
  const [professor, setProfessor] = useState<Professor | undefined>();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'professor')) {
      router.push('/');
    }
    
    if (!loading && user) {
        // Find a professor whose email matches. If not, assign one.
        let assignedProfessor = initialProfessors.find(p => p.email === user.email);
        
        if (!assignedProfessor) {
            // This logic assigns a professor to the user if their email is not in the data.
            // In a real app, you might have a registration flow for professors.
            // For this demo, we'll try to find an unassigned professor or the first one.
            const unassignedProfessor = initialProfessors.find(p => p.email.includes('@university.edu'));
            assignedProfessor = unassignedProfessor || initialProfessors[0];
            assignedProfessor.email = user.email;
        }
        setProfessor(assignedProfessor);
    }
  }, [user, loading, router]);

  const handleStatusChange = (professorId: string, newStatus: Professor['status']) => {
    if (professor && professor.id === professorId) {
      const updatedProfessor = { ...professor, status: newStatus, lastUpdated: new Date().toISOString() };
      setProfessor(updatedProfessor);

      // In a real app, you would update this in a database.
      // For demo, we can update the initialProfessors array, but this change won't persist across reloads.
      const profIndex = initialProfessors.findIndex(p => p.id === professorId);
      if(profIndex !== -1) {
        initialProfessors[profIndex] = updatedProfessor;
      }
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
