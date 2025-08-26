'use client';

import { useState, useEffect } from 'react';
import type { Professor } from '@/types';
import ProfessorCard from '@/components/professors/professor-card';
import Header from '@/components/layout/header';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { initialProfessors } from '@/data/professors';
import { Loader2 } from 'lucide-react';

export default function StudentDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [professors, setProfessors] = useState<Professor[]>(initialProfessors);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?role=student');
    }
  }, [user, loading, router]);

  const handleStatusChange = (professorId: string, newStatus: Professor['status']) => {
    // In a real app, this would be a no-op for students, or maybe a refresh.
    // Here we'll just reflect the change locally for the demo.
    setProfessors(prevProfessors =>
      prevProfessors.map(p =>
        p.id === professorId ? { ...p, status: newStatus, lastUpdated: new Date().toISOString() } : p
      )
    );
  };

  const filteredProfessors = professors.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (loading || !user) {
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
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">Student Dashboard</h1>
          <p className="text-muted-foreground mb-6">Welcome, {user.email}. Find your professors below.</p>
          
          <div className="mb-8">
            <Input 
              type="search"
              placeholder="Search for a professor by name or department..."
              className="max-w-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessors.map(professor => (
              <ProfessorCard
                key={professor.id}
                professor={professor}
                onStatusChange={handleStatusChange}
                isStudentView={true}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
