type PHeaderElementNames = {
    id: string
    path: string
    name: string
}

export const pathHome: string = '/'

export const headerElementNames: PHeaderElementNames[] = [
    { id: 'home', path: pathHome, name: 'Home' },
    { id: 'favorite', path: '/favorites', name: 'Favorite Songs' },
]