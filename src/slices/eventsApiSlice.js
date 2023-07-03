import { EVENTS_URL, STATS, USER_EVENTS } from "../constants";
import {apiSlice} from './apiSlice'



export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => ({
        url: EVENTS_URL,
        prepareHeaders: (headers, { getState }) => {
          const accessToken = getState().auth.userInfo.access_token
          if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`)
          }  
      
          return headers
        },
      }),

      keepUnusedDataFor: 5
    }),
    getStatistics: builder.query({
      query: () => ({
        url: STATS
      }),
      keepUnusedDataFor: 5
    }),
    getUserEvents: builder.query({
      query: () => ({
        url: USER_EVENTS
      })
    }),
    getEventDetails: builder.query({
      query: (eventId) => ({
        url: `${EVENTS_URL}${eventId}`,
      }),
      keepUnusedDataFor: 5
    }),
    addEvent: builder.mutation({
      query: (data) => ({
        url: EVENTS_URL,
        method: 'POST',
        body: data,
        prepareHeaders: (headers, { getState }) => {
          headers.set('Access-Control-Allow-Origin', '*');
          headers.set("Content-Type", "multipart/form-data");
          return headers
      }        
      }),
    }),
    editEvent: builder.mutation({
      query: (data) => ({
        url: `${EVENTS_URL}${data.get("id")}`,
        method: 'PATCH',
        body: data,
        prepareHeaders: (headers, { getState }) => {
          headers.set('Access-Control-Allow-Origin', '*');
          headers.set("Content-Type", "multipart/form-data");
          return headers
      }        
      })
    }),
  }),
})

export const { useAddEventMutation, useEditEventMutation, useGetEventsQuery, useGetUserEventsQuery ,  useGetEventDetailsQuery, useGetStatisticsQuery } = eventApiSlice