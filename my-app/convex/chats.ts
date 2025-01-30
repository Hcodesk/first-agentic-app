import { mutation , query } from "./_generated/server"
import {v} from "convex/values"

//mutation est une operation qui modifie des donnees dans la base de donnees
export const createChat = mutation({
    args: {
      title: v.string(),
    }, //champ qui definit le schema des arguments
 
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity(); //recuperer l'identite de l'user grace au contexte d'authentification
      if (!identity) {
        throw new Error("Not authenticated");
      } 

    /*   ctx est fournit par convex et fourni des outils comme ctx.auth pour l'auth et ctx.bd pour interagir avec la bd */
  
      const chat = await ctx.db.insert("chats", {
        title: args.title,
        userId: identity.subject, //la prop subject de l'obj renvoyee par getUseridenty represente l'id unique attribuee a un user par le systeme d'authentification
        createdAt: Date.now(),
      });
  
      return chat;
    }, //ce champ defini la fonction principal qui etblit la logique de cette mutation
  });


  export const deleteChat = mutation({
      
    args : {id : v.id("chats") } ,

    handler : async (ctx, args) => {
         const identity = await ctx.auth.getUserIdentity() 

         if (!identity) {
            throw new Error ("not authenticated")
         }

         const chat = await ctx.db.get(args.id)

         if (!chat || chat.userId !== identity.subject ) {
            throw new Error ("Unauthorized")
         }

         //delete all messages in the chat
         const messages = await ctx.db 
         .query("messages") //interoge la table messages de la base de donnees
         .withIndex("by_chat", (q) => q.eq("chatId", args.id ) ) //q est une instance de requete de filtrage utilisee pour executer des requetes specifique . 
         // ici applique un filtre pour garder les champs avec chatId correspondant a l'id de args
         .collect() // collecte les resultats et les renvoie sous forme de tableau

         for (const message of messages ) {
            await ctx.db.delete(message._id)
         }
         await ctx.db.delete(args.id) //delete the chat

    }
  })

  //une query est une requete qui recupere des donnees dans la bd sans les modifier
  export const getChat = query ({
      args : { id : v.id("chats") , userId : v.string() } ,

      handler : async (ctx , args) => {
          try {
            const chat = await ctx.db.get(args.id) 
            //return null if chat doesn't exist 
            if (!chat || chat.userId !== args.userId ) {
               console.log(" Chat not found or unauthorized", {
                    chatExists : !!chat, //!!converti la valeur de chat en boolean
                    chatUserId : chat?.userId,
                    requestUserId : args.userId
               } /* objet nous permettant de savoir l'etat des choses */ )

               return null
            }

            console.log(" Chat found and authorized")
            return chat

          } catch (error) {
             console.error (" Error in getChat:", error)
             return null
          }
      }
  })


  //dans la foulee
  //vertigineux