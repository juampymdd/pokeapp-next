import { type } from "os";

const toggleFavorite = ( id: number ) => {

  let favorites: number[] = JSON.parse( localStorage.getItem('favorites')|| '[]' );

  if ( favorites.includes(id) ) {
    favorites = favorites.filter( fav => fav !== id )
  }
  else {
    favorites.push(id)
  }

  localStorage.setItem('favorites', JSON.stringify(favorites))

}

const existInFavorites = ( id: number ): boolean => {
    
    if (typeof window === 'undefined') return false;

    let favorites: number[] = JSON.parse( localStorage.getItem('favorites')|| '[]' );

    return favorites.includes( id );
}

const pokemons = (): number[] => {
  return JSON.parse( localStorage.getItem('favorites')|| '[]' );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  toggleFavorite,
  existInFavorites,
  pokemons
}