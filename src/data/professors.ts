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
    email: 'evelyn.reed@ssn.edu.in',
    phone: '123-456-7890',
    cabinLocation: 'CSE Building, Room 301',
    historicalStatusData: generateHistoricalData(),
    lastUpdated: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: '2',
    name: 'Dr. Samuel Croft',
    department: 'Mechanical Engineering',
    avatarUrl: 'https://picsum.photos/100/100?random=2',
    status: 'In Class',
    email: 'samuel.croft@ssn.edu.in',
    phone: '123-456-7891',
    cabinLocation: 'CAD lab, Room 212',
    historicalStatusData: generateHistoricalData(),
    lastUpdated: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: '3',
    name: 'Dr. Alisha Chen',
    department: 'Physics',
    avatarUrl: 'https://picsum.photos/100/100?random=3',
    status: 'In Meeting',
    email: 'alisha.chen@ssn.edu.in',
    phone: '123-456-7892',
    cabinLocation: 'Physics Lab, Room 450',
    historicalStatusData: generateHistoricalData(),
    lastUpdated: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: '4',
    name: 'Dr. Marcus Thorne',
    department: 'Electronics and Communication',
    avatarUrl: 'https://picsum.photos/100/100?random=4',
    status: 'Away',
    email: 'marcus.thorne@ssn.edu.in',
    phone: '123-456-7893',
    cabinLocation: 'ECE Block, Room 105',
    historicalStatusData: generateHistoricalData(),
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: '5',
    name: 'Dr. Lena Petrova',
    department: 'Civil',
    avatarUrl: 'https://picsum.photos/100/100?random=5',
    status: 'On Leave',
    email: 'lena.petrova@ssn.edu.in',
    phone: '123-456-7894',
    cabinLocation: 'Civil Block, Room 808',
    historicalStatusData: generateHistoricalData(),
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: '6',
    name: 'Dr. Kenji Tanaka',
    department: 'Information Technology',
    avatarUrl: 'https://picsum.photos/100/100?random=6',
    status: 'In Cabin',
    email: 'kenji.tanaka@ssn.edu.in',
    phone: '123-456-7895',
    cabinLocation: 'Tech Building, Room 315',
    historicalStatusData: generateHistoricalData(),
    lastUpdated: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: '7',
    name: 'Dr. Priya Sharma',
    department: 'Computer Science',
    avatarUrl: 'https://picsum.photos/100/100?random=7',
    status: 'In Cabin',
    email: 'priya.sharma@ssn.edu.in',
    phone: '234-567-8901',
    cabinLocation: 'CSE Building, Room 302',
    historicalStatusData: generateHistoricalData(),
    lastUpdated: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: '8',
    name: 'Dr. Rohan Gupta',
    department: 'Information Technology',
    avatarUrl: 'https://picsum.photos/100/100?random=8',
    status: 'In Meeting',
    email: 'rohan.gupta@ssn.edu.in',
    phone: '234-567-8902',
    cabinLocation: 'Tech Building, Room 318',
    historicalStatusData: generateHistoricalData(),
    lastUpdated: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
  {
    id: '9',
    name: 'Dr. Anjali Menon',
    department: 'Electronics and Communication',
    avatarUrl: 'https://picsum.photos/100/100?random=9',
    status: 'In Class',
    email: 'anjali.menon@ssn.edu.in',
    phone: '234-567-8903',
    cabinLocation: 'ECE Block, Room 108',
    historicalStatusData: generateHistoricalData(),
    lastUpdated: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
  },
  {
    id: '10',
    name: 'Dr. Vikram Singh',
    department: 'Mechanical Engineering',
    avatarUrl: 'https://picsum.photos/100/100?random=10',
    status: 'Away',
    email: 'vikram.singh@ssn.edu.in',
    phone: '234-567-8904',
    cabinLocation: 'CAD Lab, Room 215',
    historicalStatusData: generateHistoricalData(),
    lastUpdated: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  }
];
