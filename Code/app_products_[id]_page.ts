import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { useCart } from '@/hooks/useCart';

export async function generateMetadata({ params }) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });
  return {
    title: product ? `${product.name} - Shop Web` : 'Sản phẩm không tồn tại',
    description: product?.description || 'Mua sắm sản phẩm chất lượng tại Shop Web',
  };
}

export default async function ProductPage({ params }) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-2xl font-semibold text-blue-600 mb-4">{product.price} VNĐ</p>
        <p className="mb-4">Tồn kho: {product.stock}</p>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}

function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  return (
    <button
      onClick={() => addToCart(product)}
      className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 w-full"
    >
      Thêm vào giỏ hàng
    </button>
  );
}