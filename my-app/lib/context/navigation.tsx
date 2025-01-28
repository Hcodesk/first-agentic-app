"use client";

import { createContext, useState, useContext } from "react";

interface NavigationContextType {
  isMobileNavOpen: boolean; //boolean indiquant si la navigation mobile est ouverte
  setIsMobileNavOpen: (open: boolean) => void; // fonction pour definir l'etat de la navigation
  closeMobileNav: () => void; //fonction pour fermer la navigation mobile
}

const NavigationContext = createContext <NavigationContextType | undefined>(
  undefined
); //le contexte est cree avec une valeur par defaut a undefined. objet de stockage du contexte

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); //nav mobile ferme par defaut

  const closeMobileNav = () => setIsMobileNavOpen(false); //fonction pour fermer la nav mobile

  return (
    <NavigationContext.Provider value={{ isMobileNavOpen, setIsMobileNavOpen, closeMobileNav }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
} //useNavigation est un hook personnalisee qui permet de consommer le context dans les composant enfants

//ce fichier definit un contexte de navigation pour une application React
//Fonctionne comme zustand a la diff qu'ici tout le composant est rendu lorsque l'etat change
//Navigation provider va encapsuler l'app principal pour rendre disponible le contexte partout dans l'application