<template>
    <div>
       <b-tooltip class="lyrics-tooltip" :label="label" position="is-right">
            {{ name }}
        </b-tooltip>
    </div>    
</template>

<script>

    import SongData from '../data/SongData'

    export default {
        name: 'SongWriter',
        props: {                    
            id: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            }        

        },
        data() {
            return {
            }
        },      
        computed: {    
            label() {
                return SongData[this.id].join("\n");
            }
        },
        methods: {                     
        }
    }
</script>

<style>
.lyrics-tooltip:after {
    white-space: pre!important;
}
</style>
