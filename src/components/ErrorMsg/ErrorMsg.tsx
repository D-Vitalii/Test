import React from "react"
import { Typography } from "@mui/material"

interface IErrorMsg {
    message: string
}
export const ErrorMsg: React.FC<IErrorMsg> = ({message}) => <Typography variant="h5">{message}</Typography>