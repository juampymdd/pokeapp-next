import { GetStaticProps, NextPage } from 'next'
import { Layout } from "@/components/layouts"
import { Grid } from "@nextui-org/react"
import { pokeApi } from '@/api'
import { PokemonListResponse, SmallPokemon } from '@/interfaces'
import { PokemonCard } from '@/components/pokemons';


interface Props {
  pokemons: SmallPokemon[]
}
// Se ejecuta en el cliente
const HomePage: NextPage<Props> = ({ pokemons }) => {
  console.log({ pokemons })
  return (
    <Layout title="Listado de Pokémons">
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map(pokemon=>(
            <PokemonCard pokemon={pokemon} key={pokemon.id}/>
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

// Se ejecuta en el servidor

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => {
    const id = pokemon.url.split('/')[6]
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
    return {
      ...pokemon,
      id,
      img
    }
  })

  return {
    props: {
      pokemons:pokemons
    }, // will be passed to the page component as props
  }
}
export default HomePage