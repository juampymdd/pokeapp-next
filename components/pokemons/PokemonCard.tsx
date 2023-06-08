import { SmallPokemon } from "@/interfaces"
import { Card, Grid, Row, Text } from "@nextui-org/react"
import { useRouter } from "next/router"
import { FC } from "react"

interface Props {
  pokemon: SmallPokemon
}

export const  PokemonCard: FC<Props> = ({pokemon}) => {
  const {id, name, img} = pokemon
  const router = useRouter()

  const onClick = () => {router.push(`/name/${ name }`)}

  return (
    <Grid xs={6} sm={3}  xl={1} key={id}>
              <Card isPressable onClick={onClick}>
                <Card.Body css={{p:1}}>
                <Card.Image 
                  alt={`Imagen de ${name}`}
                  width="100%"
                  height={140} 
                  src={img}
                />
                </Card.Body>
                <Card.Footer>
                  <Row justify='space-between'>
                    <Text transform='capitalize'>{ name }</Text>
                    <Text>#{ id }</Text>
                  </Row>
                </Card.Footer>
              </Card>
              
            </Grid>
  )
}