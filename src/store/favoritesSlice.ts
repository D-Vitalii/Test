import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Song {
    id: string
    name: string
    cover: string
    artistId: string
    artistName: string
    duration: string
}

export interface IAddedToFavorite {
    [key: string]: boolean
}

interface FavoritesState {
    favoriteSongs: Song[],
    favoriteSongsIds: IAddedToFavorite,
}

const initialState: FavoritesState = {
    favoriteSongs: [],
    favoriteSongsIds: {},
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavoriteSong: (state, action: PayloadAction<Song>) => {
            const { id } = action.payload
            state.favoriteSongs.push(action.payload)
            state.favoriteSongsIds[id] = true
        },
        removeFavoriteSong: (state, action: PayloadAction<string>) => {
            const songIdToRemove = action.payload
            state.favoriteSongs = state.favoriteSongs.filter((song) => song.id !== songIdToRemove)
            delete state.favoriteSongsIds[songIdToRemove]
        }
    },
})

export const { addFavoriteSong, removeFavoriteSong } = favoritesSlice.actions
export default favoritesSlice.reducer