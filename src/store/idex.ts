import { clienteHttp } from "@/http";
import { INotificacao } from "@/interfaces/INotificacoes";
import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as useStoreVuex } from "vuex";
import { OBTER_PROJETOS } from "./tipo-acoes";
import { ADICIONAR_PROJETO, ALTERAR_PROJETO, DEFINIR_PROJETOS, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";

interface Estado {
    projetos: IProjeto[],
    notificacoes:INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes:[]
    },
    mutations: {
        [ADICIONAR_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERAR_PROJETO](state,projeto:IProjeto){
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state,id:string){
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETOS](state,projetos:IProjeto[]){
            state.projetos = projetos
        },
        [NOTIFICAR](state,novaNotificacao:INotificacao){
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(()=>{
                state.notificacoes = state.notificacoes.filter(not => not.id != novaNotificacao.id)
            },3000)
        }
    },actions:{
        [OBTER_PROJETOS]({commit}){
            clienteHttp.get('projetos')
            .then(resposta =>commit(DEFINIR_PROJETOS,resposta.data))
        }
    }
})

export const useStore=():Store<Estado>=>useStoreVuex(key)