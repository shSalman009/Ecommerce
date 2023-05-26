import { apiSlice } from "../api/apiSlice";

export const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all blogs
    getBlogs: builder.query({
      query: () => "blogs",
    }),

    // get a blog by id
    getBlog: builder.query({
      query: (id) => `blogs/${id}`,
    }),
  }),
});

export const { useGetBlogsQuery, useGetBlogQuery } = blogApi;
