import { useRouter } from 'next/router'
import React from 'react'
import { useNavigation } from '@/lib/context/navigation'

export default function Sidebar() {
   const router = useRouter() //hook pour manipuler la navigation 
   const { closeMobileNav } = useNavigation()




  return (
    <div>Sidebar</div>
  )
}
