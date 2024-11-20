import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store/store';

export interface IBookstore {
    error: string;
    title: string;
    subtitle: string;
    authors: string;
    publisher: string;
    language: string;
    isbn10: string;
    isbn13: string;
    pages: string;
    year: string;
    rating: string;
    desc: string;
    price: string;
    image: string;
    url: string;
    pdf: string;
    stars: number;
}

export interface IBookstoreState {
    bookDetails: IBookstore[] | null;
    bookLoading: boolean;
    bookError: string | null;
    currentBooks: IBookstore[] | null;
    currentPage: number;
    totalPages: number;
    searchTerm: string;
}

const initialState: IBookstoreState = {
    bookDetails: [] as IBookstore[],
    bookLoading: false,
    bookError: null,
    currentBooks: [] as IBookstore[],
    currentPage: 1,
    totalPages: 0,
    searchTerm: '',
};

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

export const fetchBookByIsbn = createAsyncThunk<IBookstore, string>(
    'bookstore/fetchBookByIsbn',
    async (isbn13: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://api.itbook.store/1.0/books/${isbn13}`);
            if (!response.ok) {
                throw new Error('Failed to fetch book');
            }
            const data = await response.json();
            return data as IBookstore;
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
            const filteredBooks = state.bookDetails 
                ? state.bookDetails.filter(book => 
                    book.title.toLowerCase().includes(state.searchTerm.toLowerCase())
                )
                : [];

            state.currentBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            state.currentPage = 1;
            const filteredBooks = state.bookDetails 
                ? state.bookDetails.filter(book => 
                    book.title.toLowerCase().includes(action.payload.toLowerCase())
                )
                : [];

            state.totalPages = Math.ceil(filteredBooks.length / booksPerPage);
            state.currentBooks = filteredBooks.slice(0, booksPerPage);
        },
        updateBookStars: (state, action: PayloadAction<{ isbn13: string; stars: number }>) => {
            const { isbn13, stars } = action.payload;
            if (state.bookDetails) {
                const book = state.bookDetails.find(book => book.isbn13 === isbn13);
                if (book) {
                    book.stars = stars;
                }
            }
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
            })
            .addCase(fetchBookByIsbn.fulfilled, (state, action) => {
                if (state.bookDetails) {
                    const index = state.bookDetails.findIndex(book => book.isbn13 === action.payload.isbn13);
                    if (index !== -1) {
                        state.bookDetails[index] = { ...action.payload, stars: state.bookDetails[index].stars || 0 };
                    } else {
                        state.bookDetails.push({ ...action.payload, stars: 0 });
                    }
                } else {
                    state.bookDetails = [{ ...action.payload, stars: 0 }];
                }
            });
    }
});

export const { setCurrentPage, setSearchTerm, updateBookStars } = bookstoreSlice.actions; // добавьте updateBookStars
export const selectBook = (state: RootState) => state.bookstore;
export default bookstoreSlice.reducer;