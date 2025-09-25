import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/';
import { prisma } from '@/prisma';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

function handler(req: Request) {
   return fetchRequestHandler({
      endpoint: '/api/trpc',
      req,
      router: appRouter,
      createContext: (opts) => { 
         const authHeader = opts.req.headers.get("authorization");
         let userId: string | undefined = undefined;

         if (authHeader?.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            try {
               const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
               userId = decoded.userId;
            } catch (err) {
               console.warn("Invalid JWT token");
            }
         }
         return {
            prisma,
            userId,
         };
      }
   });
}
export { handler as GET, handler as POST };