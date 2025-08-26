'use server';

interface CalendarEvent {
    summary: string;
    start: string;
    end: string;
}

// This is a mock service to simulate fetching Google Calendar events.
// In a real application, this would involve OAuth2 and the Google Calendar API.
const mockCalendarData: { [key: string]: CalendarEvent[] } = {
    'evelyn.reed@ssn.edu.in': [
        // Today's schedule
        { summary: 'CS101 Lecture', start: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(), end: new Date(new Date().setHours(11, 0, 0, 0)).toISOString() },
        { summary: 'Faculty Meeting', start: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(), end: new Date(new Date().setHours(15, 30, 0, 0)).toISOString() },
        
        // Yesterday's schedule
        { summary: 'Advanced Algorithms Class', start: new Date(new Date(Date.now() - 86400000).setHours(11, 0, 0, 0)).toISOString(), end: new Date(new Date(Date.now() - 86400000).setHours(12, 30, 0, 0)).toISOString() },

        // Tomorrow's schedule
        { summary: 'Project Sync-up', start: new Date(new Date(Date.now() + 86400000).setHours(9, 0, 0, 0)).toISOString(), end: new Date(new Date(Date.now() + 86400000).setHours(10, 0, 0, 0)).toISOString() },
    ]
};

export async function getCalendarEvents(professorEmail: string): Promise<CalendarEvent[]> {
    console.log(`Fetching mock calendar events for ${professorEmail}`);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCalendarData[professorEmail] || [];
}
