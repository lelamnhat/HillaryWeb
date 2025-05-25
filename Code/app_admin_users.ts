import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Quản lý người dùng - Shop Web',
  description: 'Xem danh sách người dùng trong hệ thống',
};

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  const users = await prisma.user.findMany();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Quản lý người dùng</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id} className="py-4">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Tên:</strong> {user.name}</p>
              <p><strong>Vai trò:</strong> {user.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}