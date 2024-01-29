import React from "react"
import {Link} from "react-router-dom"
import {Button, Card, CardContent, CardMedia, Typography} from "@mui/material"
import {ArtistsModel} from "../../api/models"

interface IArtist {
    data: ArtistsModel
    isSongsPage?: boolean
}

export const Artist: React.FC<IArtist> = ({ data, isSongsPage = true }) => {
    return (
        <Card sx={{marginBottom: '16px'}}>
            <CardMedia
                component="img"
                height="140"
                width="140"
                image={data.avatar}
                alt={data.name}
                sx={{width: '260px'}}
            />
            <CardContent>
                <Typography variant="h5">{data.name}</Typography>
                <Typography variant="body2">Count songs: {data.songsCount}</Typography>
                {!isSongsPage &&
                    <Button
                        component={Link}
                        to={`/artist/${data.id}`}
                        color="primary"
                    >
                     Open artist page
                    </Button>
                }
            </CardContent>
        </Card>
    )
}