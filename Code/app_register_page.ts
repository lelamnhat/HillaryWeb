import AuthForm from '@/components/AuthForm';

export const metadata = {
  title: 'Đăng ký - Shop Web',
  description: 'Tạo tài khoản để bắt đầu mua sắm trực tuyến',
};

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Đăng ký</h1>
        <AuthForm type="register" />
      </div>
    </div>
  );
}