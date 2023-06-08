import { Card, Grid } from "@nextui-org/react"
import { useRouter } from "next/router"
import { FC } from "react"

interface Props {
  pokemonId: number
}
export const FavoriteCardPokemon: FC<Props> = ({ pokemonId }) => {
  const router = useRouter()
  const onFavoritedClicked = () => {
    console.log(pokemonId)
    //Navego a la ruta de detalle del pokemon usando router
    router.push(`/pokemon/${pokemonId}`)
  }

  return (
    <Grid onClick={onFavoritedClicked} key={ pokemonId } xs={ 6 } sm={ 3 } md={ 2 } xl={ 2 }>
    <Card isPressable css={{ padding:10}}>
      <Card.Image 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
      />
    </Card>
  </Grid>
  )
}
