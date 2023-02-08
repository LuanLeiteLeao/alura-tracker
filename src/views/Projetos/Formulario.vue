<template>
    <form @submit.prevent="salvar">
        <div class="field">
            <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
            <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
        </div>
        <div class="field">
            <button class="button" type="submit">Salvar</button>
        </div>
    </form>
</template>

<script lang="ts">
import useNotificador from '@/hooks/Notificador';
import { TipoNotificacao } from '@/interfaces/INotificacoes';
import { useStore } from '@/store/idex';
import { ADICIONAR_PROJETO, ALTERAR_PROJETO } from '@/store/tipo-mutacoes';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Formulário',
    props: {
        id: {
            type: String
        }
    },
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    data() {
        return {
            nomeDoProjeto: ''
        }
    },
    methods: {
        salvar() {

            if (this.id) {
                this.store.commit(ALTERAR_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                })
            } else {
                this.store.commit(ADICIONAR_PROJETO, this.nomeDoProjeto)
            }

            this.notificar("Novo Proheto Salvo","Novo Proheto Salvo",TipoNotificacao.SUCESSO)

            this.nomeDoProjeto = ''
            this.$router.push('/projetos')
        }
    },
    setup() {
        const store = useStore()
        const {notificar}  = useNotificador()
        return {
            store,
            notificar

        }
    }

}
)
</script>

