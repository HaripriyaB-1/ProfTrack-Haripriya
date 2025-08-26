import { notFound } from 'next/navigation';
import Image from 'next/image';
import { initialProfessors } from '@/data/professors';
import Header from '@/components/layout/header';
import StatusBadge from '@/components/professors/status-badge';
import LeaveMessage from '@/components/professors/leave-message';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ProfessorPageProps {
  params: {
    id: string;
  };
}

export default function ProfessorPage({ params }: ProfessorPageProps) {
  const professor = initialProfessors.find(p => p.id === params.id);

  if (!professor) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <Card className="overflow-hidden">
              <CardHeader className="p-0">
                 <div className="relative h-32 bg-primary/20">
                    <Image
                      src={`https://picsum.photos/seed/${professor.id}/600/200`}
                      alt="Abstract background"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="opacity-50"
                      data-ai-hint="abstract background"
                    />
                 </div>
              </CardHeader>
              <CardContent className="p-6 text-center -mt-16">
                 <Avatar className="h-24 w-24 mx-auto border-4 border-background shadow-lg">
                    <AvatarImage src={professor.avatarUrl} alt={professor.name} data-ai-hint="person face" />
                    <AvatarFallback>{professor.name.charAt(0)}</AvatarFallback>
                 </Avatar>
                 <h1 className="text-2xl font-bold mt-4">{professor.name}</h1>
                 <p className="text-muted-foreground">{professor.department}</p>
                 <div className="mt-4 flex justify-center">
                    <StatusBadge status={professor.status} />
                 </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <a href={`mailto:${professor.email}`} className="hover:underline text-primary">
                    {professor.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span>{professor.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span>{professor.cabinLocation}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <LeaveMessage professor={professor} />
          </div>
        </div>
      </main>
    </div>
  );
}
