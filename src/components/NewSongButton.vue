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
                this.$emit('newSeed');                                
            },            
        }
    }

</script>

<style>


</style>
