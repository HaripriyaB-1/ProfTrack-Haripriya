'use client';

import { useState, useEffect } from 'react';
import { initialProfessors } from '@/data/professors';
import type { Professor } from '@/types';
import ProfessorCard from '@/components/professors/professor-card';
import Header from '@/components/layout/header';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Loader2, RefreshCw } from 'lucide-react';
import ReceivedMessages from '@/components/professors/received-messages';
import { getCalendarEvents } from '@/lib/google-calendar-mock';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function ProfessorDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [professor, setProfessor] = useState<Professor | undefined>();
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'professor')) {
      router.push('/');
    }
    
    if (!loading && user) {
        let assignedProfessor = initialProfessors.find(p => p.email === user.email);
        
        if (!assignedProfessor) {
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
      const profIndex = initialProfessors.findIndex(p => p.id === professorId);
      if(profIndex !== -1) {
        initialProfessors[profIndex] = updatedProfessor;
      }
    }
  };

  const handleCalendarSync = async () => {
    if (!professor) return;

    setIsSyncing(true);
    const events = await getCalendarEvents(professor.email);
    const now = new Date();
    
    const currentEvent = events.find(event => {
        const start = new Date(event.start);
        const end = new Date(event.end);
        return now >= start && now <= end;
    });

    let newStatus = professor.status;
    let toastMessage = "No current events found in calendar. Status unchanged.";

    if (currentEvent) {
        if (currentEvent.summary.toLowerCase().includes('class') || currentEvent.summary.toLowerCase().includes('lecture')) {
            newStatus = 'In Class';
        } else if (currentEvent.summary.toLowerCase().includes('meeting')) {
            newStatus = 'In Meeting';
        } else {
            newStatus = 'Away'; // Default for other calendar events
        }
        toastMessage = `Status updated to "${newStatus}" based on calendar event: "${currentEvent.summary}".`;
    }

    if (newStatus !== professor.status) {
        handleStatusChange(professor.id, newStatus);
    }
    
    toast({
        title: 'Google Calendar Sync',
        description: toastMessage,
    });

    setIsSyncing(false);
  };
  
  if (loading || !user || !professor) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  const canSyncCalendar = professor.email === 'evelyn.reed@ssn.edu.in';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex flex-wrap justify-between items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Professor Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Welcome back, {professor.name}. Manage your status and view student messages.
                </p>
              </div>
              {canSyncCalendar && (
                <Button onClick={handleCalendarSync} disabled={isSyncing}>
                  {isSyncing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="mr-2 h-4 w-4" />
                  )}
                  Sync with Google Calendar
                </Button>
              )}
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
