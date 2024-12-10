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
export interface ICartItem {
    book: IBookstore;
    quantity: number;
}
export interface IFavoriteBooks {
    book: IBookstore;
}
export interface IBookstoreState {
    bookDetails: IBookstore[] | null;
    bookLoading: boolean;
    bookError: string | null;
    currentBooks: IBookstore[] | null;
    currentPage: number;
    totalPages: number;
    searchTerm: string;
    cartItems: ICartItem[];
    favoriteBooks: IFavoriteBooks[];
}
const initialState: IBookstoreState = {
    bookDetails: [] as IBookstore[],
    bookLoading: false,
    bookError: null,
    currentBooks: [] as IBookstore[],
    currentPage: 1,
    totalPages: 0,
    searchTerm: '',
    cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]') as ICartItem[],
    favoriteBooks: JSON.parse(localStorage.getItem('favoriteBooks') || '[]') as IFavoriteBooks[],
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
            if (!data.books || data.books.length === 0) {
                throw new Error('No books found');
            }
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

export const selectTotalSum = (state: RootState) => {
    return state.bookstore.cartItems.reduce((total, item) => {
        const priceInNumber = parseFloat(item.book.price.replace('$', '')) || 0;
        return total + (priceInNumber * item.quantity);
    }, 0).toFixed(2); 
};

let booksPerPage = 12;

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
            const book = state.bookDetails?.find(book => book.isbn13 === isbn13);
            if (book) {
                book.stars = stars;
            }
        },
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            const existingItem = state.cartItems.find(item => item.book.isbn13 === action.payload.book.isbn13);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.cartItems.push(action.payload);
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action: PayloadAction<ICartItem>) => {
            state.cartItems = state.cartItems.filter(item => item.book.isbn13 !== action.payload.book.isbn13);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        addToFavorites: (state, action: PayloadAction<IFavoriteBooks>) => {
            const existingFavorite = state.favoriteBooks.find(favorite => favorite.book.isbn13 === action.payload.book.isbn13);
            if (!existingFavorite) {
                state.favoriteBooks.push(action.payload);
            }
            localStorage.setItem('favoriteBooks', JSON.stringify(state.favoriteBooks));
        },
        removeFromFavorites: (state, action: PayloadAction<string>) => {
            state.favoriteBooks = state.favoriteBooks.filter(fav => fav.book.isbn13 !== action.payload);
            localStorage.setItem('favoriteBooks', JSON.stringify(state.favoriteBooks));
        },
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
            localStorage.setItem('cartItems', JSON.stringify(action.payload));
        }
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

export const { setCurrentPage, setSearchTerm, updateBookStars, addToCart, removeFromCart, addToFavorites, removeFromFavorites, setCartItems } = bookstoreSlice.actions;
export const selectBook = (state: RootState) => state.bookstore;
export const selectFavoriteBooks = (state: RootState) => state.bookstore.favoriteBooks;

export default bookstoreSlice.reducer;