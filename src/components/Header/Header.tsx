import React from 'react'
import { useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Button, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { headerElementNames, pathHome } from "../../constants/headerElementNames"
import { RootState } from "../../store/rootReducer"

const getPageTitle = (path: string): string => {
    if (path.startsWith('/artist/')) {
        return 'Artists'
    } else if (path === '/favorites') {
        return 'Favorites'
    } else {
        return 'Home'
    }
}
export const Header: React.FC = () => {
    const favoriteSongs = useSelector((state: RootState) => state.favorites.favoriteSongs)

    const navigate = useNavigate()
    const url = window.location.pathname

    const goBack = () => {
        navigate(-1)
    }

    return (
        <AppBar position="static">
            <Toolbar>
                {url !== pathHome &&
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="back"
                        onClick={goBack}
                        sx={{marginRight: '16px'}}
                    >
                        <ArrowBackIcon/>
                    </IconButton>
                }
                <Typography>{getPageTitle(url)}</Typography>
                {headerElementNames.map(page => (
                    <Button
                        key={page.id}
                        component={Link}
                        to={page.path}
                        color="inherit"
                    >
                        {page.name}
                    </Button>
                ))}
                {favoriteSongs.length ? (
                    <><FavoriteIcon/><Typography>{favoriteSongs.length}</Typography></>
                ) : (
                    <FavoriteBorderIcon />
                )}
            </Toolbar>
        </AppBar>
    )
}
