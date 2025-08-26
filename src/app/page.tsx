import Header from '@/components/layout/header';
import ProfessorDashboard from '@/components/professors/dashboard';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <ProfessorDashboard />
      </main>
    </div>
  );
}
