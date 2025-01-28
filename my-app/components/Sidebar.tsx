import { useRouter } from 'next/router'
import React from 'react'
import { useNavigation } from '@/lib/context/navigation'
import { useQuery , useMutation } from "convex/react" 
import { api } from "@/convex/_generated/api"

export default function Sidebar() {
   const router = useRouter() //hook pour manipuler la navigation 
   const { closeMobileNav } = useNavigation() 
   
   const chats = useQuery(api.chats.listChats)//usequery est utilisee pour executer et gerer les requetes de donnees
   const createChat = useMutation(api.chats.createChat) //useMutation est utilisee pour executer des mutations de donnees (operations qui modifient les donnees createChat ici)
   const deleteChat = useMutation(api.chats.deleteChat)

   const handleNewChat = async () => {
            const chatId = await createChat({ title: "New Chat" }) //methode pour creer un new chat 
            router.push(`/dashboard/chat/${chatId} `) //router push permet de rediriger l'utilisateur vers une page sans recharger la page entiere           
   }



  return (
    <div>Sidebar</div>
  )
}
