import { useCart } from '@/hooks/useCart';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105">
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-blue-600 font-bold mt-2">{product.price} VNĐ</p>
        <p className="text-gray-500 mt-1">Tồn kho: {product.stock}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}