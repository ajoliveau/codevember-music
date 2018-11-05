<template>
    <div>
        [Chorus]
        {{ lyrics.chorus.join("\n") }}

        [Verse]
        {{ lyrics.verses[0].join("\n")}}

        [Chorus]

        [Verse]
        {{ lyrics.verses[1].join("\n")}}

        [Chorus]

        [Verse]
        {{ lyrics.verses[2].join("\n")}}

        [Chorus]
    </div>    
</template>


<script>

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
    }
</script>

<style>
.lyrics {
    white-space: pre-line;
}
</style>
