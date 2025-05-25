import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata = {
  title: 'Admin - Shop Web',
  description: 'Bảng điều khiển quản trị cho Shop Web',
};

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Bảng điều khiển Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Link
          href="/admin/products"
          className="bg-blue-500 text-white py-4 px-6 rounded-lg hover:bg-blue-600 text-center"
        >
          Quản lý sản phẩm
        </Link>
        <Link
          href="/admin/users"
          className="bg-blue-500 text-white py-4 px-6 rounded-lg hover:bg-blue-600 text-center"
        >
          Quản lý người dùng
        </Link>
      </div>
    </div>
  );
}