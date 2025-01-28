"use client"
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { NavigationProvider } from '@/lib/context/navigation'
import React from 'react'
import { Authenticated } from 'convex/react'  //convex/react fournit un contexte d'auth utilisee par le composant Authenticated pour recuperer des informations sur l'etat de l'utilisateur
/* le contexte d'auth est genere par une bibliotheque d'authentification comme clerck, firebase.. ces bibliotheque gere les sessions utilisateurs, les jetons d'authentification, et les cookies pour
maitenir l'etat de connexion de l'utilisateur  */


export default function DashboardLayout( { children } : {children : React.ReactNode } ) {
  return (
    <NavigationProvider> 
         <div className="flex h-screen" >

          <Authenticated> {/* utilise le contexte d'auth pour verifier si un user est connectee et rend conditionnellement ces enfants en fonction de cette verification */}
            <Sidebar/>
          </Authenticated>

              <div className="flex-1 flex flex-col min-w-0 " >
                <Header/>
                <main className="flex-1 overflow-y-auto"> {children} </main>
              </div>
         </div>
    </NavigationProvider>
  )
}
