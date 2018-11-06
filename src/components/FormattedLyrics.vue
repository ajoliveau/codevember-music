<template>
    <div class="lyrics">
        <Lyric v-for="(lyric, index) in lyrics.text" :skipTypeDisplay="lyrics.skipTypeDisplay" :key="index" :lyric="lyric" ></Lyric>
        
    </div>    
</template>


<script>

    import Lyric from './Lyric.vue'

    export default {
        name: 'Lyrics',
        props: {                    
            lyrics: {
                type: Object,
                required: true
            }            
        },
        data() {
            return {              
            }
        },
        components: {
            Lyric
        }              
    }
</script>

<style>
.lyrics {
    /*white-space: pre-line;*/
}
</style>
