export type ProfessorStatus = 'In Class' | 'In Meeting' | 'On Leave' | 'Away' | 'In Cabin';

export const ALL_STATUSES: ProfessorStatus[] = ['In Cabin', 'In Class', 'In Meeting', 'Away', 'On Leave'];

export interface Professor {
  id: string;
  name: string;
  department: string;
  avatarUrl: string;
  status: ProfessorStatus;
  email: string;
  phone: string;
  cabinLocation: string;
  historicalStatusData: string;
}
