'use client';

import { useState } from 'react';
import { initialProfessors } from '@/data/professors';
import type { Professor } from '@/types';
import ProfessorCard from './professor-card';

export default function ProfessorDashboard() {
  const [professors, setProfessors] = useState<Professor[]>(initialProfessors);

  const handleStatusChange = (professorId: string, newStatus: Professor['status']) => {
    setProfessors(prevProfessors =>
      prevProfessors.map(p =>
        p.id === professorId ? { ...p, status: newStatus } : p
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-6 font-headline">Professor Dashboard</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Welcome to ProfferTrack. Here you can see the current status of your professors. As a demo, you can change their status to see how the dashboard updates in real-time.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professors.map(professor => (
          <ProfessorCard
            key={professor.id}
            professor={professor}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}
