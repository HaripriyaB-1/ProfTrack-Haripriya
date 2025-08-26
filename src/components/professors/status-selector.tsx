'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProfessorStatus, ALL_STATUSES } from '@/types';

interface StatusSelectorProps {
  currentStatus: ProfessorStatus;
  onStatusChange: (newStatus: ProfessorStatus) => void;
}

export default function StatusSelector({ currentStatus, onStatusChange }: StatusSelectorProps) {
  return (
    <Select value={currentStatus} onValueChange={onStatusChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Set status" />
      </SelectTrigger>
      <SelectContent>
        {ALL_STATUSES.map(status => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
