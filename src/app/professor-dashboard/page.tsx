'use client';

import { useState, useEffect } from 'react';
import { initialProfessors } from '@/data/professors';
import type { Professor } from '@/types';
import ProfessorCard from '@/components/professors/professor-card';
import Header from '@/components/layout/header';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import ReceivedMessages from '@/components/professors/received-messages';

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
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">Professor Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Welcome back, {professor.name}. Manage your status and view student messages.
                </p>
            </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-8">
                <ProfessorCard
                  key={professor.id}
                  professor={professor}
                  onStatusChange={handleStatusChange}
                  isStudentView={false}
                />
            </div>
            <div className="lg:col-span-2">
                <ReceivedMessages professor={professor} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
