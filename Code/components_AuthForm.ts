'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AuthForm({ type }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (type === 'register') {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password }),
      });
      if (res.ok) {
        await signIn('credentials', { email, password, redirect: false });
        router.push('/');
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } else {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        setError('Thông tin đăng nhập không đúng');
      } else {
        router.push('/');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      {type === 'register' && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Tên</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      )}
      <div>
        <label htmlFor="password" className="block text-sm font-medium">Mật khẩu</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full border rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700"
      >
        {type === 'register' ? 'Đăng ký' : 'Đăng nhập'}
      </button>
    </form>
  );
}