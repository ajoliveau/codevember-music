<template>
    <div v-bind:style="style">        
        <div v-if="!skipTypeDisplay">
            <div v-if="lyric.type === 'chorus'">[Chorus]</div>
            <div v-else>[Verse]</div>
        </div>
        <div class="texte">
            {{ lyric.text.join("\n") }}
        </div>        
        <br/>
    </div>    
</template>


<script>

    export default {
        name: 'Lyric',
        props: {                    
            lyric: {
                type: Object,
                required: true
            },
            skipTypeDisplay: {
                type: Boolean,
                required: false
            }            
        },
        computed: {
            style() {
                if (this.lyric.text.length != 1) {
                    return {
                        "white-space": "pre-line"
                    }
                }
            }
        },
        data() {
            return {              
            }
        },              
    }
</script>

<style>
.texte {
    margin-top: -10px;
}
</style>
