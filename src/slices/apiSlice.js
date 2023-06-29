import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BASE_URL} from '../constants'

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  mode: 'cors',
  prepareHeaders: (headers, { getState }) => {

    const userInfo = getState().auth.userInfo
    if (userInfo && userInfo.access_token) {
      headers.set('authorization', `Bearer ${userInfo.access_token}`)
    }  

    return headers
  },
})

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Events', 'User'],
  endpoints: (builder) => ({})
})