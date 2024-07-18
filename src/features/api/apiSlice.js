import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
reducerPath: 'api',  //articleApi
baseQuery: fetchBaseQuery({baseUrl:'http://localhost:3004'}),
tagTypes: ['Post'],
endpoints: builder=>({}
)



})