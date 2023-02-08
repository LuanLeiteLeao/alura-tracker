import { TipoNotificacao } from "@/interfaces/INotificacoes"
import { store } from "@/store/idex"
import { NOTIFICAR } from "@/store/tipo-mutacoes"

type Notificador = {
    notificar:  (titulo:string,texto:string,tipo:TipoNotificacao) => void
}

export default ():Notificador=>{

    const  notificar = (titulo:string,texto:string,tipo:TipoNotificacao):void=> {
        store.commit(NOTIFICAR, {
            titulo,
            texto,
            tipo
        }) 
    }
    return{
        notificar
    }
}
