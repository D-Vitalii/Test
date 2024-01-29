import React from 'react'
import { Link } from "react-router-dom"
import { Button } from "@mui/material"
import { styled } from '@mui/system'

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
})

export const NotFoundPage: React.FC = () => {
    return (
        <Container>
            <h2>404 - page not found</h2>
            <Button component={Link} to="/" color="inherit">
                Click this return Home page
            </Button>
        </Container>
    )
}
