import { FC } from 'react'

import Head from 'next/head'
import { Navbar } from '../ui';

type Props = {
  children?: React.ReactNode,
  title?: string
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {
  
  

  return (
    <>
      <Head>
        <title>{title || 'PokémonApp'}</title>
        <meta name="author" content="Juan Pablo Maddoni"/>
        <meta name="description" content={`Información sobre el pokémon ${title}`}/>
        <meta name="keywords" content={`${ title }, Pokémon, Pókedex`}/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        
        <meta property="og:title" content={`Información sobre: ${ title }`} />
        <meta property="og:description" content={`Esta es la página sobre ${ title }`} />
        <meta property="og:image" content={`${ origin }/img/banner.png`} />
      </Head>
        <Navbar/>
      <main style={{padding:'0 2rem'}}>
        { children }
      </main>
    </>
  )
}
