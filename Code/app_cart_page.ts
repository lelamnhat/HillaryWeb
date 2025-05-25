import { useCart } from '@/hooks/useCart';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

export const metadata = {
  title: 'Giỏ hàng - Shop Web',
  description: 'Xem và quản lý các sản phẩm trong giỏ hàng của bạn',
};

export default async function CartPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Giỏ hàng của bạn</h1>
      <CartContent session={session} />
    </div>
  );
}

function CartContent({ session }) {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Giỏ hàng trống</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.id} className="py-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p>{item.price} VNĐ</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Xóa tất cả
            </button>
            {session ? (
              <Link
                href="/checkout"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Thanh toán
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Đăng nhập để thanh toán
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}