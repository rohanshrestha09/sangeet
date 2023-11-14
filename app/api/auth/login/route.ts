import { NextRequest } from 'next/server';
import { createEdgeRouter } from 'next-connect';
import { serialize } from 'cookie';
import { errorHandler } from '@/utils/exception';

interface RequestContext {
   params: undefined;
}

const router = createEdgeRouter<NextRequest, RequestContext>();

router.post(async (req) => {
   const serialized = serialize('token', 'Rohan', {
      httpOnly: true,
      secure: false, // process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
   });

   return new Response('Hello', {
      headers: { 'Set-Cookie': serialized },
   });
});

export async function POST(req: NextRequest, ctx: RequestContext) {
   return router.run(req, ctx).catch(errorHandler) as Promise<Response>;
}
