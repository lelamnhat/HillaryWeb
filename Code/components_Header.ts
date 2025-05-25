import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Shop Web
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="text-gray-600 hover:text-blue-600">
            Giỏ hàng
          </Link>
          {session ? (
            <>
              <Link href="/account" className="text-gray-600 hover:text-blue-600">
                Tài khoản
              </Link>
              {session.user.role === 'ADMIN' && (
                <Link href="/admin" className="text-gray-600 hover:text-blue-600">
                  Admin
                </Link>
              )}
              <form action="/api/auth/signout" method="POST">
                <button className="text-gray-600 hover:text-blue-600">
                  Đăng xuất
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-blue-600">
                Đăng nhập
              </Link>
              <Link href="/register" className="text-gray-600 hover:text-blue-600">
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}