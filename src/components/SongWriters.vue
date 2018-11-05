<template>
    <div>
        <div class="button" v-on:click="click">Buy next songwriter : {{this.nextSongWriterName}}</div>
        <br/>
        SongWriters : 
        <ul>
            <li v-for="(item, index) in this.songWriters.slice(0, this.nextSongWriter)">
                <SongWriter :id="index" :name="item"></SongWriter>                
            </li>
        </ul>        
    </div>    
</template>

<script>

    import SongWriter from './SongWriter.vue'

    export default {
        name: 'SongWriters',
        props: {                    
            songWriters: {
                type: Array,
                required: true
            },
            nextSongWriter: {
                type: Number,
                required: true
            }         
        },
        data() {
            return {
            }
        },      
        computed: {
            nextSongWriterName() {
                return this.songWriters[this.nextSongWriter];
            },
            style: function() {
                return {
                    position:"absolute",
                    top: this.top,
                    left: this.left,
                }
            }
        },
        methods: {     
            click: function() {
                this.$emit('click');                        
            },         
        },
        components: {
            SongWriter
        }
    }
</script>

<style>

</style>
