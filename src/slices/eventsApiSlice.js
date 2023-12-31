import { EVENTS_URL, NOTICES_URL, STATS, USER_EVENTS, HELP } from "../constants";
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
    getNotices: builder.query({
      query: () => ({
        url: NOTICES_URL,
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
        url: `${EVENTS_URL}${eventId}/`,
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
        url: `${EVENTS_URL}${data.get("id")}/`,
        method: 'PATCH',
        body: data,
        prepareHeaders: (headers, { getState }) => {
          headers.set('Access-Control-Allow-Origin', '*');
          headers.set("Content-Type", "multipart/form-data");
          return headers
      }        
      }),
    
    }),
    addHelp: builder.mutation({
      query: (data) => ({
        url: HELP,
        method: 'POST',
        body: data,
        prepareHeaders: (headers, { getState }) => {
          headers.set('Access-Control-Allow-Origin', '*');
          headers.set("Content-Type", "multipart/form-data");
          return headers
      }        
      })
    }),
    getHelp: builder.query({
      query: () => ({
        url: HELP,
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
  }),
})

export const { useAddEventMutation, useAddHelpMutation , useEditEventMutation, useGetHelpQuery , useGetEventsQuery, useGetNoticesQuery, useGetUserEventsQuery ,  useGetEventDetailsQuery, useGetStatisticsQuery } = eventApiSlice