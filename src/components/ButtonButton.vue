<template>
    <div class="button-button" v-bind:style="style">
        <div class="button is-large is-fullwidth" v-on:click="click" :disabled="onCooldown">
            <div class="text" v-if="onCooldown">Button</div>
            <div v-else>Click me !</div>
            <div class="cooldown" v-bind:style="{ width: width + '%' }">                
            </div>
        </div>
    </div>    
</template>

<script>

	export default {
		name: 'ButtonButton',
		props: {					
			cooldown: {
				type: Number,
				required: true
			},
            speed: {
                type: Number,
                required: true
            },

            newMoneyButton: {
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
				this.width = 100;
				this.$bind(`ButtonButton`, this.update);
						
			},          
			update: function( deltaTime ) {
				this.durationRemaining -= deltaTime  * this.speed;
				if (this.durationRemaining <= 0) {
                    this.newMoneyButton(false);
					this.durationRemaining = this.cooldown;
                    this.width = 100;
				} else {					
					this.width = this.durationRemaining / this.cooldown * 100;
				}
			}
		}
	}
</script>

<style>
.button-button .button {
	background-color: initial!important;
}

.button-button {
    width:150px;
}
.text {
    font-weight: bold;
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
