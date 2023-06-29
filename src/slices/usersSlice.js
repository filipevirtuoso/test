import { LOGIN_URL, USER_DETAIL_URL } from "../constants";
import {apiSlice} from './apiSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: LOGIN_URL,
        method: 'POST',
        body: data,
      //   prepareHeaders: (headers, { getState }) => {
      //     headers.set('Access-Control-Allow-Origin', '*');
      //     headers.set("Content-Type", "application/json");
      //     return headers
      // }        
      }),
    }),
    userDetail: builder.query({
      query: (id) => ({
        url: USER_DETAIL_URL,
      }),
    }),
    getUserName: builder.query({
      query: (id) => ({
        url: USER_DETAIL_URL,
      }),
    }),
  }),
})

export const { useLoginMutation, useUserDetailQuery, useLazyGetUserNameQuery } = usersApiSlice