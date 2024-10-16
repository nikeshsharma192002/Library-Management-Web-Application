import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//MAKES GET REQUESTS TO BACKEND

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",

    endpoints: (build) => ({
        getBooks: build.query({
            query: () => `general/dashboard`,
            providesTags: ["Books"],
        }),
        getMember: build.query({
            query: (id) => `/management/edit/member/${id}`,
            providesTags: ["Member"],
        }),
        getMembers: build.query({
            query: () => `management/members`,
            providesTags: ["Members"],
        }),
        deleteMember: build.mutation({
            query: (id) => ({
                url: `/management/edit/member/${id}`,
                method: 'DELETE',
            }),
        }),
        addMember: build.mutation({
            query: (newMember) => ({
                url: '/management/edit/addMember',
                method: 'POST',
                body: newMember
            }),
            providesTags: ["Add Member"]
        }),
        editMember: build.mutation({
            query: ({ Member, id }) => ({
                url: `/management/edit/member/${id}`,
                method: 'PUT',
                body: Member
            }),
            providesTags: ["Edit Member"]
        }),
        issueBook: build.mutation({
            query: ({ email, bookID }) => ({
                url: '/management/issueBook',
                method: 'POST',
                body: { email, bookID }
            }),
            providesTags: ["Issue Book"]
        }),
        returnBook: build.mutation({
            query: ({ email, bookID }) => ({
                url: '/management/returnBook',
                method: 'POST',
                body: { email, bookID }
            }),
            providesTags: ["Issue Book"]
        }),
        getTransactions: build.query({
            query: () => ({
                url: "data/transactions",
                method: "GET",
            }),
            providesTags: ["Transactions"],
        }),
        importBook: build.mutation({
            query: ({ isbn, quantity }) => ({
                url: '/management/importBook',
                method: 'POST',
                body: { isbn, quantity }
            }),
            providesTags: ["Import Book"]
        }),




    }),

})

export const {

    //all product+stats json objext
    useGetBooksQuery,
    useGetMemberQuery,
    useGetMembersQuery,
    useDeleteMemberMutation,
    useAddMemberMutation,
    useEditMemberMutation,
    useIssueBookMutation,
    useGetTransactionsQuery,
    useReturnBookMutation,
    useImportBookMutation,


} = api