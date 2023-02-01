<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempo-em-segundos="tempoEmSegundos" />
        <Botao @clicado="iniciar" icone="fas fa-play" texto="play" :desabilitado="cronometroRodando" />
        <Botao @clicado="finalizar" icone="fas fa-stop" texto="stop" :desabilitado="!cronometroRodando" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Botao from './Botao.vue';
import Cronometro from './Cronometro.vue';

export default defineComponent({
    name: 'Temporizador',
    emits: ['aoTemporizadorFinalizado'],
    components: {
        Cronometro,
        Botao
    },
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    methods: {
        iniciar() {
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1
            }, 1000)
            this.cronometroRodando = true
            console.log('iniciado')
        },
        finalizar() {

            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
            console.log('finalizado')
            this.limparTemporizador()

        },
        limparTemporizador() {
            clearInterval(this.cronometro);
            this.tempoEmSegundos = 0;
            this.cronometroRodando = false;
        }
    }
})
</script>