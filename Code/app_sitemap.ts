import { prisma } from '@/lib/prisma';

export default async function sitemap() {
  const baseUrl = 'https://your-service-name.onrender.com';
  const products = await prisma.product.findMany();

  const staticPages = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/login`, lastModified: new Date() },
    { url: `${baseUrl}/register`, lastModified: new Date() },
    { url: `${baseUrl}/cart`, lastModified: new Date() },
    { url: `${baseUrl}/checkout`, lastModified: new Date() },
    { url: `${baseUrl}/account`, lastModified: new Date() },
  ];

  const productPages = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: product.updatedAt,
  }));

  return [...staticPages, ...productPages];
}