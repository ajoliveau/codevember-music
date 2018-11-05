<template>
    <div>
        <div class="button" v-on:click="newSeed">New Song</div>
    </div>    
</template>


<script>
    export default {
        name: 'NewSongButton',
        props: {                                    
        },
        data() {
            return {                
                seed: 'AAAAAA',
            }
        },              
        methods: {                     
            newSeed() {
                const seed = Math.random().toString(36).substring(7);
                console.log(seed);
                this.$emit('newSeed', seed);                                
            },            
        }
    }

</script>

<style>

</style>
