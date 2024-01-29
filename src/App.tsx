import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import rootReducer from './store/rootReducer'
import { Header } from './components'
import { ArtistsPage, FavoriteSongsPage, HomePage, NotFoundPage } from './page'

const store = configureStore({
    reducer: rootReducer,
})

export const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Header />
                <Routes>
                    <Route path="/artist/:id" element={<ArtistsPage />} />
                    <Route path="/favorites" element={<FavoriteSongsPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </Provider>
    )
}