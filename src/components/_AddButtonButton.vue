<template>
    <div class="add-button">
        <div class="button" v-on:click="$emit('newButtonButton')">
            Add Button Button : {{this.cost}}$
        </div>
    </div>
</template>

<script>

    export default {
        name: 'AddButtonButton',
        props: {                    
            cost: {
                type: Number,
                required: true
            }
        },
    }
</script>
