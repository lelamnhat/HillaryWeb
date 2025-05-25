import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Phương thức không được phép' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Chưa đăng nhập' });
  }

  const { cart } = req.body;
  if (!cart || !Array.isArray(cart)) {
    return res.status(400).json({ message: 'Giỏ hàng không hợp lệ' });
  }

  try {
    const lineItems = cart.map((item) => ({
      price_data: {
        currency: 'vnd',
        product_data: { name: item.name },
        unit_amount: item.price,
      },
      quantity: item.quantity || 1,
    }));

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
    });

    const order = await prisma.order.create({
      data: {
        userId: parseInt(session.user.id),
        total: cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0),
        products: { connect: cart.map((item) => ({ id: item.id })) },
      },
    });

    await prisma.transaction.create({
      data: {
        orderId: order.id,
        stripeId: stripeSession.id,
        amount: stripeSession.amount_total,
        status: 'PENDING',
      },
    });

    return res.status(200).json({ id: stripeSession.id });
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi xử lý thanh toán' });
  }
}