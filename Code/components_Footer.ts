export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop Web</h3>
            <p>Cửa hàng trực tuyến với các sản phẩm chất lượng cao.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-blue-300">Trang chủ</a></li>
              <li><a href="/cart" className="hover:text-blue-300">Giỏ hàng</a></li>
              <li><a href="/account" className="hover:text-blue-300">Tài khoản</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <p>Email: support@shopweb.com</p>
            <p>Phone: +84 123 456 789</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2025 Shop Web. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}