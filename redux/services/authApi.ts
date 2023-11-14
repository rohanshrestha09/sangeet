import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const AUTH = 'AUTH' as const;

export const authApi = createApi({
   reducerPath: 'authApi',
   baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/`,
      credentials: 'include',
      cache: 'no-store',
   }),
   tagTypes: [AUTH],
   endpoints: (builder) => ({
      login: builder.mutation<null, object>({
         query: (body) => ({
            url: 'login',
            method: 'POST',
            body,
         }),
         invalidatesTags: [{ type: AUTH, id: 'DETAIL' }],
      }),
   }),
});

export const { useLoginMutation } = authApi;
