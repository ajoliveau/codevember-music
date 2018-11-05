<template>
    <div class="money">
        <div class="text">Money : {{ this.money }}$</div>        
    </div>
</template>

<script>
    export default {
        name: 'Money',
        props: {
            money: {
                type: Number,
                required: true
            },                     
        },
        data() {
            return {                
            }
        },        
    }
</script>