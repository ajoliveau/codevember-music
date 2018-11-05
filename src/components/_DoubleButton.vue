<template>
    <div class="double-button">
        <div class="button" v-on:click="$emit('doubleButton')">
            Double Speed : {{ this.cost }}$           
        </div>
    </div>
</template>

<script>

    export default {
        name: 'DoubleButton',       
         props: {                    
            cost: {
                type: Number,
                required: true
            }
        },
    }
</script>
