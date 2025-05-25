import AuthForm from '@/components/AuthForm';

export const metadata = {
  title: 'Đăng nhập - Shop Web',
  description: 'Đăng nhập để mua sắm và quản lý tài khoản của bạn',
};

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Đăng nhập</h1>
        <AuthForm type="login" />
      </div>
    </div>
  );
}