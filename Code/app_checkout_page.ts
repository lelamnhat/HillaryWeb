import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { useCart } from '@/hooks/useCart';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Thanh toán - Shop Web',
  description: 'Hoàn tất đơn hàng của bạn với thanh toán an toàn',
};

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Thanh toán</h1>
      <CheckoutContent />
    </div>
  );
}

function CheckoutContent() {
  const { cart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
      <ul className="divide-y divide-gray-200 mb-6">
        {cart.map((item) => (
          <li key={item.id} className="py-3 flex justify-between">
            <span>{item.name}</span>
            <span>{item.price} VNĐ</span>
          </li>
        ))}
      </ul>
      <form action="/api/checkout" method="POST" className="text-center">
        <button
          type="submit"
          className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 w-full"
        >
          Thanh toán với Stripe
        </button>
      </form>
    </div>
  );
}