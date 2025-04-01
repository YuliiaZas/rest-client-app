import NextAuth from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/utils';

const handler = async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
};

export { handler as GET, handler as POST };
