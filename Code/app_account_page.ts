import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Tài khoản - Shop Web',
  description: 'Quản lý thông tin tài khoản cá nhân của bạn',
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Tài khoản của bạn</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <p className="mb-4"><strong>Email:</strong> {session.user.email}</p>
        <p className="mb-4"><strong>Tên:</strong> {session.user.name}</p>
      </div>
    </div>
  );
}