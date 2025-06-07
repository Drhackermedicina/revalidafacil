import Link from 'next/link';

const AdminPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Link href="/admin/create-stations">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Criar Estações
        </button>
      </Link>
    </div>
  );
};

export default AdminPage;