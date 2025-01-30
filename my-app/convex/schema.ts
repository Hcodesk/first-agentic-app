import {defineSchema, defineTable} from "convex/server"
import {v} from "convex/values" //permet de definir le type des valeurs de chaque champ

export default defineSchema ({
    chats : defineTable({
        title : v.string(), //titre du chat
        userId : v.string(), //id de l'user
        createdAt : v.number() //date de creation
    }) , //table chat

    messages : defineTable({ 
        chatId : v.id("chats"), //le champ chatId fait reference a l'id d'un enregistrement dans la table chats. cle etrangere
        content : v.string(),
        role : v.union(v.literal("user"), v.literal("assistant") ), 
        createdAt: v.number()
    }).index("by_chat", ["chatId"] ) //.index permet de creer un index sur des champs d'une table en fonction de l'id du champs
}) //fonction pour definir le schema de la bd. prend un obj en argument ou chaque cle represente une table de la bd
 

//npx convex dev pour deployer les changement de schema