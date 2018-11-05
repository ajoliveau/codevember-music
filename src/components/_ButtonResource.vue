<template>
    <div class="button-resource" v-bind:style="style">
        <div class="button is-medium is-fullwidth" v-on:click="click" :disabled="onCooldown">
            <div v-if="onCooldown">Money</div>
            <div v-else>Click me !</div>
            <div class="cooldown" v-bind:style="{ width: width + '%' }">                
            </div>
        </div>
    </div>    
</template>

<script>

	export default {
		name: 'ButtonResource',
		props: {					
			cooldown: {
				type: String,
				required: true
			},
            speed: {
                type: Number,
                required: true
            },

            addMoney: {
                type: Function,
                required: true
            },
            top: {
                type: String,
                required: true
            },
            left: {
                type: String,
                required: true
            },
		},
		data() {
			return {
				durationRemaining: 0,
				onCooldown: false,
				width: 0
			}
		},		
        computed: {
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
				if (this.onCooldown)
					return;

				this.onCooldown = true;
				this.durationRemaining = this.cooldown;
				this.width = 0;
				this.$bind(`Button`, this.update);
						
			},          
			update: function( deltaTime ) {
				this.durationRemaining -= deltaTime  * this.speed;
				if (this.durationRemaining <= 0) {
                    this.addMoney();
					this.durationRemaining = this.cooldown;
                    this.width = 0;
				} else {				
					this.width = (this.cooldown - this.durationRemaining) / this.cooldown  * 100;
				}
			}
		}
	}
</script>

<style>
.button-resource .button {
	background-color: initial!important;
}

.button-resource {
    width:150px;
}
.cooldown {
	position: absolute;
	top: 0px;
	left: 0px;
	z-index: -1;
	height: 100%;
	background-color: rgb(221, 221, 221);
	width: 0%;
}
</style>
