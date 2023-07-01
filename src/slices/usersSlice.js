import { LOGIN_URL, LOGOUT_URL, USER_DETAIL_URL, USER } from "../constants";
import {apiSlice} from './apiSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: LOGIN_URL,
        method: 'POST',
        body: data,  
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: LOGOUT_URL,
        method: 'POST',
        body: data,
      })
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
    updateUser: builder.mutation({
      query: (data) => ({
        url:`${USER}${data.get("id")}`,
        method: 'PUT',
        body: data,
        prepareHeaders: (headers, { getState }) => {
          headers.set('Access-Control-Allow-Origin', '*');
          headers.set("Content-Type", "multipart/form-data");
          return headers
      }        
      }),
      invalidateTags: ['User'],
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useUserDetailQuery, useUpdateUserMutation, useLazyGetUserNameQuery } = usersApiSlice