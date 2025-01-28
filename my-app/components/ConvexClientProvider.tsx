"use client"
import React from 'react'
import { ClerkProvider, useAuth } from "@clerk/nextjs"; //le provider rend les fonctionnalite accessible a toute l'appli et useAuth est un hook pour recuperer les infos sur l'user connecte
import { ConvexProviderWithClerk } from "convex/react-clerk";// combine convex et clerk pour permettre d'associer l'authtentification user avec les reauetes ou mutations dans convexe
//convex est une solution de base de donnees/serverless reactive pour synchroniser des donnees en temps reel
import { ConvexReactClient } from "convex/react"//cree une instance cliente pour se connecter a un backend convex
import { ReactNode} from "react" //es utiisee pour typer les enfants de children ce qui inclut n'importe quel contenu pouvant etre rendu par react

const convex = new ConvexReactClient( process.env.NEXT_PUBLIC_CONVEX_URL!)

export default function ConvexClientProvider( {children} : {children : ReactNode} ) {
  return (
    <ClerkProvider>
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
    </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}

//ce file configure un client convex avec une url backend
//combine convex avec clerk pour offrir a la fois l'acces a une base de donnees reactive et une une gestion avancee de l'authemtification
//definit un composant ConvexClientProvider pour faciliter l'integration de ces outils dans une app next js 
