import React, { useEffect, useState } from 'react'
import { AxiosError } from "axios"
import { Box, Typography } from '@mui/material'
import { ArtistsModel } from "../../api/models"
import { getReq } from "../../api"
import { Artist, Spinner } from '../../components'
import { ARTISTS_URL } from "../../constants/api"
import { styled } from "@mui/system"

const Container = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
})

export const HomePage: React.FC = () => {
    const [data, setData] = useState<ArtistsModel[]>()
    const [error, setError] = useState<AxiosError>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setError(undefined)
        getReq(ARTISTS_URL)
            .then(res => setData(res.data))
            .catch(err =>  setError(err))
            .finally(() => setLoading(false))
    }, [])

    return (
        <Box>
            <h2>Artists</h2>
            {loading && <Spinner />}
            {data?.length &&
                <Container>
                    {data.map((artist: ArtistsModel) => <Artist key={artist.id} data={artist} isSongsPage={false} />)}
                </Container>
            }
            {error && <Typography variant="h5">{error.message}</Typography>}
        </Box>
    )
}