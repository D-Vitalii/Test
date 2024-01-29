import React, { useCallback, useEffect, useState } from 'react'
import { AxiosError } from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, List, Typography } from '@mui/material'
import { RootState } from '../../store/rootReducer'
import { removeFavoriteSong } from "../../store/favoritesSlice"
import {Songs, Spinner} from "../../components"
import { getReq } from "../../api"
import { SongsModel } from "../../api/models"
import { ONE_SONG_URL } from "../../constants/api"

export const FavoriteSongsPage: React.FC = () => {
    const dispatch = useDispatch()
    const favoriteSong = useSelector((state: RootState) => state.favorites.favoriteSongs)

    const [favoriteSongsData, setFavoriteSongsData] = useState<SongsModel[]>()
    const [error, setError] = useState<AxiosError>()
    const [loading, setLoading] = useState<boolean>(true)

    const isSongInFavorites = useCallback(
        (song: SongsModel) => favoriteSong.some((favSong) => favSong.id === song.id),
        [favoriteSong]
    )

    const isSongInData = useCallback(
        (song: SongsModel) => favoriteSongsData?.some((dataSong) => dataSong.id === song.id),
        [favoriteSongsData]
    )

    const handleRemoveFromFavorite = useCallback(
        (song: SongsModel) => {
            const isInFavorites = isSongInFavorites(song)
            const isInData = isSongInData(song)

            if (isInFavorites) {
                dispatch(removeFavoriteSong(song.id))

                if (favoriteSongsData && isInData) {
                    setFavoriteSongsData((prevData) => prevData?.filter((dataSong) => dataSong.id !== song.id))
                }
            }
        },
        [dispatch, isSongInFavorites, isSongInData, favoriteSongsData]
    )

    useEffect(() => {
        setError(undefined)
        const fetchDataForIds = async () => {
            try {
                const requests = favoriteSong.map(song => getReq(`${ONE_SONG_URL(song.artistId, song.id)}`))
                const results = await Promise.all(requests)
                return results.map(result => result.data)
            } catch (err) {
                return setError(err as AxiosError)
            }
        }

        fetchDataForIds()
            .then((res => {
                setFavoriteSongsData(res as SongsModel[])
            }))
            .finally(() => setLoading(false))
    }, [])

    return (
        <Box>
            <Typography variant="h4">Favorite Songs</Typography>
            {loading && <Spinner/>}
            {!favoriteSongsData?.length && !error?.message ? (
                <Typography variant="body1">No Songs</Typography>
            ) : (
                <List>
                    {favoriteSongsData?.map((song) => (
                        <Songs key={song.id} song={song} >
                            <Button variant="outlined" color="error" onClick={() => handleRemoveFromFavorite(song)}>
                                Remove
                            </Button>
                        </Songs>
                    ))}
                </List>
            )}
            {error?.message && <Typography variant="h5">{error.message}</Typography>}
        </Box>
    )
}