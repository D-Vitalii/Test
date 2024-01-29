import React, {ReactNode} from "react"
import { Avatar, ListItem, ListItemText } from "@mui/material"
import { SongsModel } from "../../api/models"

interface ISongs {
    song: SongsModel
    children: ReactNode
}
export const Songs: React.FC<ISongs> = ({song, children }) => {
    const listItemPrimary = song?.artistName ? `Artist: ${song.artistName}, Song: ${song.name}` : `${song.name}`

    return (
        <ListItem key={song.id}>
            <Avatar alt="Cover" src={song.cover} sx={{ marginRight: '20px' }} />
            <ListItemText
                primary={listItemPrimary}
                secondary={`Duration: ${song.duration}`}
            />
            {children}
        </ListItem>
    )
}