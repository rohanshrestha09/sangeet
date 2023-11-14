import { JsonWebTokenError } from 'jsonwebtoken';

export class HttpException extends Error {
   constructor(
      public readonly statusCode: number,
      public readonly message: string
   ) {
      super(message);
   }
}

export const errorHandler = (err: unknown) => {
   if (err instanceof JsonWebTokenError)
      return Response.json({ message: err.message }, { status: 401 });
   else if (err instanceof HttpException)
      return Response.json(
         { message: err.message },
         { status: err.statusCode }
      );
   else if (err instanceof Error)
      return Response.json({ message: err.message }, { status: 500 });
   else
      return Response.json(
         { message: 'Something went wrong' },
         { status: 500 }
      );
};
