import { Badge } from '@/components/ui/badge';
import type { ProfessorStatus } from '@/types';
import { cn } from '@/lib/utils';
import { BookOpen, Users, PlaneTakeoff, Coffee, UserCheck } from 'lucide-react';

interface StatusBadgeProps {
  status: ProfessorStatus;
  className?: string;
}

const statusStyles: Record<ProfessorStatus, string> = {
  'In Class': 'bg-orange-500 hover:bg-orange-600',
  'In Meeting': 'bg-blue-500 hover:bg-blue-600',
  'On Leave': 'bg-red-500 hover:bg-red-600',
  'Away': 'bg-purple-500 hover:bg-purple-600',
  'In Cabin': 'bg-green-500 hover:bg-green-600',
};

const statusIcons: Record<ProfessorStatus, React.ReactNode> = {
    'In Class': <BookOpen className="h-3 w-3" />,
    'In Meeting': <Users className="h-3 w-3" />,
    'On Leave': <PlaneTakeoff className="h-3 w-3" />,
    'Away': <Coffee className="h-3 w-3" />,
    'In Cabin': <UserCheck className="h-3 w-3" />,
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge className={cn('flex items-center gap-1.5 text-white', statusStyles[status], className)}>
      {statusIcons[status]}
      <span>{status}</span>
    </Badge>
  );
}
