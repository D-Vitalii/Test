import React, { useEffect, useState } from 'react'
import { AxiosError } from "axios"
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, List, Button, Pagination, Box } from '@mui/material'
import { RootState } from '../../store/rootReducer'
import { addFavoriteSong, removeFavoriteSong, Song } from '../../store/favoritesSlice'
import { getReq } from "../../api"
import { ArtistsModel } from "../../api/models"
import { SongsModel } from "../../api/models"
import {Artist, ErrorMsg, Songs, Spinner} from "../../components"
import { ONE_ARTIST_URL, SONGS_URL } from "../../constants/api"
import { defaultPagePagination, defaultSongsPerPage } from "../../constants/global"

export const ArtistsPage: React.FC = () => {
    const {id} = useParams()

    const dispatch = useDispatch()

    const favoriteSongsIds = useSelector((state: RootState) => state.favorites.favoriteSongsIds)

    const [songs, setSongs] = useState<SongsModel[]>()
    const [artist, setArtist] = useState<ArtistsModel>()

    const [errorSongs, setErrorSongs] = useState<AxiosError>()
    const [errorArtist, setErrorArtist] = useState<AxiosError>()

    const [loadingSongs, setLoadingSongs] = useState<boolean>(true)
    const [loadingArtist, setLoadingArtist] = useState<boolean>(true)

    const [currentPage, setCurrentPage] = useState(defaultPagePagination)
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    const handleAddToFavorite = (song: Song) => {
        if (!favoriteSongsIds[song.id]) {
            dispatch(addFavoriteSong(song))
        } else {
            dispatch(removeFavoriteSong(song.id))
        }
    }

    useEffect(() => {
        if (id) {
            setErrorArtist(undefined)
            getReq(ONE_ARTIST_URL(id))
                .then(res => setArtist(res.data))
                .catch(err => setErrorArtist(err))
                .finally(() => setLoadingArtist(false))
            }
    }, [id])

    useEffect(() => {
        if (id) {
            setErrorSongs(undefined)
            setLoadingSongs(true)
            setSongs(undefined)
            getReq(SONGS_URL(id), currentPage, defaultSongsPerPage)
                .then(res => setSongs(res.data))
                .catch(err => setErrorSongs(err))
                .finally(() => setLoadingSongs(false))
        }
    }, [currentPage, id])

    return (
        <Box>
            <h2>Artists</h2>
            {loadingArtist && <Spinner />}
            {artist &&
                <Artist data={artist}/>
            }
            {errorArtist && <ErrorMsg message={errorArtist.message}/>}
            <Typography variant="h5">Songs</Typography>
            {loadingSongs && <Spinner />}
            {songs?.length &&
                <>
                    <List>
                        {songs.map((song) => (
                            <Songs key={song.id} song={song} >
                                <Button onClick={() => handleAddToFavorite(song)} variant="contained" color={!favoriteSongsIds[song.id] ? 'primary' : 'error'}>
                                    {!favoriteSongsIds[song.id] ? 'Add song' : 'Remove song'}
                                </Button>
                            </Songs>
                        ))}
                    </List>

                    <Pagination
                        count={2}
                        page={currentPage}
                        onChange={(_, page) => {
                            paginate(page)
                        }}
                    />
                </>
            }
            {errorSongs && <ErrorMsg message={errorSongs.message}/>}
        </Box>
    )
}