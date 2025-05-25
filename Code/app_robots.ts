export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/admin/*', '/api/*'],
      },
    ],
    sitemap: 'https://your-service-name.onrender.com/sitemap.xml',
  };
}