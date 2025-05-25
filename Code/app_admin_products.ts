import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Quản lý sản phẩm - Shop Web',
  description: 'Thêm và xóa sản phẩm trong cửa hàng',
};

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  const products = await prisma.product.findMany();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Quản lý sản phẩm</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <form action="/api/products" method="POST" className="mb-8">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">Tên sản phẩm</label>
            <input
              type="text"
              name="name"
              id="name"
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium">Giá</label>
            <input
              type="number"
              name="price"
              id="price"
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="stock" className="block text-sm font-medium">Tồn kho</label>
            <input
              type="number"
              name="stock"
              id="stock"
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full"
          >
            Thêm sản phẩm
          </button>
        </form>
        <ul className="divide-y divide-gray-200">
          {products.map((product) => (
            <li key={product.id} className="py-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p>{product.price} VNĐ - Tồn kho: {product.stock}</p>
              </div>
              <form action={`/api/products/${product.id}`} method="DELETE">
                <button
                  type="submit"
                  className="text-red-600 hover:text-red-800"
                >
                  Xóa
                </button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}