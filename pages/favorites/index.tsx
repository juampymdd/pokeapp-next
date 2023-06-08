import { Layout } from '@/components/layouts'
import { useEffect, useState } from 'react'
import {  } from '@/components/pokemons/NoFavorites'
import localFavorite from '@/utils/localFavorite'
import { FavoritePokemons, NoFavorites } from '@/components/pokemons'

const FavoritesPage = () => {

  const [favoritePokemons, setfavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    setfavoritePokemons(localFavorite.pokemons())
  }, [])

  return (
    <Layout title="Pokémons - Favoritos">
      {favoritePokemons.length === 0 
      ?(<NoFavorites/>)
      :(<FavoritePokemons pokemons={ favoritePokemons }/>)
      }
    </Layout>
  )
}

export default FavoritesPage