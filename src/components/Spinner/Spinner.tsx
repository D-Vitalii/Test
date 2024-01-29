import React from "react"
import { Box, CircularProgress } from "@mui/material"

export const Spinner: React.FC = () =>
    <Box sx={{ display: 'flex' }}>
        <CircularProgress />
    </Box>