<template>
    <div class="add-button">
        <div class="button" v-on:click="$emit('newMoneyButton')">
            Add Money Button : {{this.cost}}$           
        </div>
    </div>
</template>

<script>

    export default {
        name: 'AddMoneyButton',
        props: {                    
            cost: {
                type: Number,
                required: true
            }
        },
    }

</script>
