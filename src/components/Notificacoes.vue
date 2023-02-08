<template>
    <div class="notificacoes">
        <article 
        class="message" 
        :class="contexto[notificacoe.tipo]"
        v-for="notificacoe in notificacoes"
        :key="notificacoe.id"
        >
            <div class="message-header">{{ notificacoe.titulo }}</div>
            <div class="message-body">
                {{ notificacoe.texto }}
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacoes';
import { useStore } from '@/store/idex';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'Notificacoes',
    data() {
        return {
            contexto: {
                [TipoNotificacao.SUCESSO]: 'is-success',
                [TipoNotificacao.ATENCAO]: 'is-warning',
                [TipoNotificacao.FALHA]: 'is-danger'
            }
        }
    },
    setup() {
        const store = useStore()
        return {
            notificacoes: computed(() => store.state.notificacoes)
        }
    }
})
</script>

<style scoped>
.notificacoes {
    position: absolute;
    right: 0;
    width: 18.75rem;
    padding: 0.5rem;
    z-index: 105;
}
</style> 