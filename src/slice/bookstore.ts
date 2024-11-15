import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from '../store/store';

export interface IBookstore {
    title: string;
    subtitle: string;
    isbn13: string;
    price: string;
    image: string;
    url: string;
    year: string;
    authors: string;
}

export interface IBookstoreState {
    bookDetails: IBookstore[] | null;
    bookLoading: boolean;
    bookError: string | null;
    currentBooks: IBookstore[] | null;
    currentPage: number;
    totalPages: number;
}

const initialState: IBookstoreState = {
    bookDetails: null,
    bookLoading: false,
    bookError: null,
    currentBooks: null,
    currentPage: 1,
    totalPages: 0,
};

export const fetchBookByIsbn = createAsyncThunk<IBookstore, string>(
    'bookstore/fetchBookByIsbn',
    async (isbn13: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://api.itbook.store/1.0/books/${isbn13}`);
            if (!response.ok) {
                throw new Error('Failed to fetch book');
            }
            const data = await response.json();
            return {
                title: data.title,
                subtitle: data.subtitle,
                isbn13: data.isbn13,
                price: data.price,
                image: data.image,
                url: data.url,
                year: data.year,
                authors: data.authors,
            } as IBookstore;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchBooks = createAsyncThunk<IBookstore[], void>(
    'bookstore/fetchBooks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://api.itbook.store/1.0/new`);
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            return data.books;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const booksPerPage = 9;

const bookstoreSlice = createSlice({
    name: "bookstore",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
            const startIndex = (action.payload - 1) * booksPerPage;
            state.currentBooks = state.bookDetails ? state.bookDetails.slice(startIndex, startIndex + booksPerPage) : null; // Обновление книг на текущей странице
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.bookLoading = true;
                state.bookError = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.bookLoading = false;
                state.bookDetails = action.payload;
                state.totalPages = Math.ceil(action.payload.length / booksPerPage);
                state.currentBooks = action.payload.slice(0, booksPerPage);
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.bookLoading = false;
                state.bookError = action.payload as string;
            });
    }
});

export const { setCurrentPage } = bookstoreSlice.actions;
export const selectBook = (state: RootState) => state.bookstore;

export default bookstoreSlice.reducer;