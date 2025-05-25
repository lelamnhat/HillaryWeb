import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg mb-12">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Chào mừng đến với Shop Web
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Khám phá các sản phẩm chất lượng với giá ưu đãi!
          </p>
          <a
            href="#products"
            className="mt-6 inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition"
          >
            Mua sắm ngay
          </a>
        </div>
      </section>

      {/* Product Grid */}
      <section id="products">
        <h2 className="text-3xl font-bold mb-8 text-center">Sản phẩm nổi bật</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}