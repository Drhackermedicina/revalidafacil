
import Link from 'next/link';
import { Button } from '@/components/ui/button'; 
import { FilePlus2, Edit } from 'lucide-react'; 

const AdminPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardLink
          href="/admin/create-stations" // Updated href to reflect the new page name
          icon={<FilePlus2 className="h-8 w-8 text-primary" />}
          title="Criar Nova Estação"
          description="Gere um novo modelo de estação clínica e edite-o em seguida."
        />
        {/* O CardLink para o Editor de Estações foi removido daqui */}
        {/* Adicione mais cards de links para outras ferramentas administrativas aqui, se necessário */}
      </div>
    </div>
  );
};

interface CardLinkProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const CardLink: React.FC<CardLinkProps> = ({ href, icon, title, description }) => {
  return (
    <Link href={href} passHref>
      <div className="block p-6 bg-card rounded-lg border shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full">
        <div className="flex items-center mb-3">
          {icon}
          <h2 className="ml-3 text-xl font-semibold text-card-foreground">{title}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
};

export default AdminPage;
