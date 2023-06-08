import { useEffect, useState } from 'react';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';

import confetti from 'canvas-confetti';

import { Layout } from '@/components/layouts'
import { getPokemonInfo, localFavorites } from '@/utils';


interface Props {
  pokemon: any

}
const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  console.log(pokemon)
  // capitalizar titulo
  const title = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)

  const [isFavorite, setIsFavorite] = useState(false)
  const [textButton, setTextButton] = useState(isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos')
  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsFavorite((prevIsFavorite) => !prevIsFavorite); // Toggle the isFavorite state
  }

  useEffect(() => {
    setIsFavorite(localFavorites.existInFavorites(pokemon.id)); // Update the isFavorite state on the client-side
  }, [pokemon.id]);

  useEffect(()=>{
    if(isFavorite){
      setTextButton('Quitar de favoritos')
    }else{
      setTextButton('Agregar a favoritos')
    }
  },[isFavorite])
  useEffect(() => {
    if (isFavorite) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        startVelocity: 15,
        spread: 360,
        angle: -100,
        origin: {
          x: 0.85,
          y: 0.2
        }
      });
    }
  }, [isFavorite]);
  
    
  
  
  return (
    <Layout title={ title }>
      <Grid.Container css={{marginTop:'5px'}} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isPressable css={{padding:'30px'}}>
            <Card.Body>
              <Card.Image
                src={ pokemon.sprites.other?.dream_world.front_default ||'/no-image.png' }
                alt={ pokemon.name }
                width="100%"
                height={ 200 }
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={ 12 } sm={ 8 }>
          <Card>
            <Card.Header css={{display:'flex', justifyContent:'space-between'}}>
              <Text h1 transform='capitalize'>{ pokemon.name }</Text>
              <Button 
                color='gradient' 
                shadow
                ghost={!isFavorite}
                onPress={onToggleFavorite}
                >
                  { textButton }
                </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction='row' display='flex' gap={ 0 }> 
                <Image 
                  src={pokemon.sprites.front_default || '/no-image.png'}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image 
                  src={pokemon.sprites.back_default || '/no-image.png'}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image 
                  src={pokemon.sprites.front_shiny || '/no-image.png'}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image 
                  src={pokemon.sprites.back_shiny || '/no-image.png'}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>

            </Card.Body>
          </Card> 
        </Grid>
      </Grid.Container>
    </Layout>
  )
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemon151 = [...Array(151)].map((value, index)=>{
    return `${index + 1}`
  })
  console.log(pokemon151)
  return {
    paths: pokemon151.map(id => ({params: { id }})),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params as {id: string};
  
  return {
    props: {
      pokemon: await getPokemonInfo( id )
    }, // will be passed to the page component as props
  }
}


export default PokemonPage
