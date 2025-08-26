'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import StatusBadge from './status-badge';
import StatusSelector from './status-selector';
import type { Professor } from '@/types';
import { ArrowRight } from 'lucide-react';

interface ProfessorCardProps {
  professor: Professor;
  onStatusChange: (professorId: string, newStatus: Professor['status']) => void;
}

export default function ProfessorCard({ professor, onStatusChange }: ProfessorCardProps) {
  return (
    <Card className="flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={professor.avatarUrl} alt={professor.name} data-ai-hint="person face" />
            <AvatarFallback>{professor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{professor.name}</CardTitle>
            <CardDescription>{professor.department}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Current Status</h4>
          <StatusBadge status={professor.status} />
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Update Status (Professor View)</h4>
          <StatusSelector
            currentStatus={professor.status}
            onStatusChange={(newStatus) => onStatusChange(professor.id, newStatus)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={`/professor/${professor.id}`}>
            View Details & Predict Contact Time
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
