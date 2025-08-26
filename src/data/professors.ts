import type { Professor } from '@/types';

const generateHistoricalData = () => {
  const data = [];
  const statuses: Professor['status'][] = ['In Class', 'In Meeting', 'Away', 'In Cabin'];
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    for (let j = 0; j < Math.floor(Math.random() * 4) + 1; j++) {
      const hour = Math.floor(Math.random() * 9) + 9; // 9am to 5pm
      const minute = Math.random() > 0.5 ? 30 : 0;
      date.setHours(hour, minute, 0, 0);
      data.push({
        timestamp: date.toISOString(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
      });
    }
  }
  return JSON.stringify(data);
};

export const initialProfessors: Professor[] = [
  {
    id: '1',
    name: 'Dr. Evelyn Reed',
    department: 'Computer Science',
    avatarUrl: 'https://picsum.photos/100/100?random=1',
    status: 'In Cabin',
    email: 'e.reed@university.edu',
    phone: '123-456-7890',
    cabinLocation: 'Tech Building, Room 301',
    historicalStatusData: generateHistoricalData(),
    lastUpdated: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: '2',
    name: 'Dr. Samuel Croft',
    department: 'Mechanical Engineering',
    avatarUrl: 'https://picsum.photos/100/100?random=2',
    status: 'In Class',
    email: 's.croft@university.edu',
    phone: '123-456-7891',
    cabinLocation: 'Engin. Hall, Room 212',
    historicalStatusData: generateHistoricalData(),
    lastUpdated: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: '3',
    name: 'Dr. Alisha Chen',
    department: 'Physics',
    avatarUrl: 'https://picsum.photos/100/100?random=3',
    status: 'In Meeting',
    email: 'a.chen@university.edu',
    phone: '123-456-7892',
    cabinLocation: 'Science Center, Room 450',
    historicalStatusData: generateHistoricalData(),
    lastUpdated: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: '4',
    name: 'Dr. Marcus Thorne',
    department: 'History',
    avatarUrl: 'https://picsum.photos/100/100?random=4',
    status: 'Away',
    email: 'm.thorne@university.edu',
    phone: '123-456-7893',
    cabinLocation: 'Humanities Bldg, Room 105',
    historicalStatusData: generateHistoricalData(),
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: '5',
    name: 'Dr. Lena Petrova',
    department: 'Mathematics',
    avatarUrl: 'https://picsum.photos/100/100?random=5',
    status: 'On Leave',
    email: 'l.petrova@university.edu',
    phone: '123-456-7894',
    cabinLocation: 'Math Tower, Room 808',
    historicalStatusData: generateHistoricalData(),
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: '6',
    name: 'Dr. Kenji Tanaka',
    department: 'Information Technology',
    avatarUrl: 'https://picsum.photos/100/100?random=6',
    status: 'In Cabin',
    email: 'k.tanaka@university.edu',
    phone: '123-456-7895',
    cabinLocation: 'Tech Building, Room 315',
    historicalStatusData: generateHistoricalData(),
    lastUpdated: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
];
