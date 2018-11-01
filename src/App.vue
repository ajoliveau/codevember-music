<template>
	<div id="app">
		<div class="columns">
			<div class="column">				
				<Money v-bind:money="money"></Money>
                Button Speed : {{ this.fillingSpeed }}x
                <br/>                
                <AddMoneyButton v-bind:cost="moneyButtonCost" @newMoneyButton="newMoneyButton"></AddMoneyButton>
                <br/>
                <AddButtonButton v-bind:cost="buttonButtonCost" @newButtonButton="newButtonButton"></AddButtonButton>
                <br/>
                <DoubleButton v-bind:cost="doubleCost" @doubleButton="doubleButton"></DoubleButton>
                <br/>
			</div>

			<div class="column is-four-fifths" ref="listResources">
                <ButtonResource top="0%" left="0%" cooldown="1500" v-bind:speed="fillingSpeed" v-bind:addMoney="addMoney"></ButtonResource>
			</div>
		</div>
	</div>
</template>

<script>

	import Money from './components/Money.vue'
    import ButtonResource from './components/ButtonResource.vue'
    import AddMoneyButton from './components/AddMoneyButton.vue'
    import AddButtonButton from './components/AddButtonButton.vue'
    import DoubleButton from './components/DoubleButton.vue'
    import ButtonButton from './components/ButtonButton.vue'
    
    
    import Vue from 'vue'		

	const TICK_RATE = 100; // Tick 10 times per second

	export default {
		name: 'App',
		data() {
			return {	
				money: 10000,
                moneyButtonCost: 5,
                buttonButtonCost: 30,
                doubleCost: 100,
                fillingSpeed: 1,
				timeSinceLastTick: 0,
				lastFrameTime: 0,
				binders: [],
                moneyButtons: [],
                buttonButtons: [],
			}
		},
		methods: {	        
            newButtonButton: function() {
                if (this.money < this.buttonButtonCost) {
                    return;
                }
                this.money -= this.buttonButtonCost;
                this.buttonButtonCost = Math.floor(this.buttonButtonCost * 1.5);

                const ComponentClass = Vue.extend(ButtonButton)
                const instance = new ComponentClass({
                    propsData: {
                        cooldown:"5000",
                        speed: this.fillingSpeed,
                        newMoneyButton: this.newMoneyButton,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 90}%`,
                    }
                })
                instance.$mount();
                instance.click();
                this.$refs.listResources.appendChild(instance.$el)
            },
            doubleButton: function() {
                if (this.money < this.doubleCost) {
                    return;
                }
                this.money -= this.doubleCost;
                this.doubleCost = Math.floor(this.doubleCost * 4);
                this.fillingSpeed *= 2;
            },         
            newMoneyButton: function(paid = true) {
                if (paid) {
                    if (this.money < this.moneyButtonCost) {
                        return;
                    }
                    this.money -= this.moneyButtonCost;
                    this.moneyButtonCost = Math.floor(this.moneyButtonCost * 1.5);    
                }
                
                const ComponentClass = Vue.extend(ButtonResource)
                const instance = new ComponentClass({
                    propsData: {
                        cooldown:"1500",                        
                        addMoney: this.addMoney,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 90}%`,
                    },
                    computed: {
                        speed: function() {
                            return this.fillingSpeed;
                        }
                    }
                })
                instance.$mount();
                instance.click();
                this.$refs.listResources.appendChild(instance.$el)
            },
            addMoney: function() {
                this.money++;
            },
			bind: function(id, fn) {
				this.binders.push({id: id, fn: fn});
			},
			unbind: function(id) {				
				for (let i = 0; i < this.binders.length; i++) {
					if (this.binders[i].id === id) {
						this.binders.splice(i, 1);
						break;
					}
				}
			},
			gameLoop: function(now) {																			
				// Main game loop

			},
			update: function(now) {   
				const deltaTime = now - this.lastFrameTime;

				this.timeSinceLastTick += deltaTime;

				if (this.timeSinceLastTick >= TICK_RATE) {	

					this.gameLoop();
					this.timeSinceLastTick = 0;
				}
				for(let i=0; i < this.binders.length; i++) this.binders[i].fn( deltaTime ); 

				this.lastFrameTime = now;  		
				requestAnimationFrame(this.update);                   
			},			
		},
		mounted: function()  {
			requestAnimationFrame(this.update);
			window.bind = this.bind;
			window.unbind = this.unbind;
		},
		components: {		
			Money,
            ButtonResource,
            AddMoneyButton,
            DoubleButton,
            AddButtonButton,
            ButtonButton,
		}
	}
</script>

<style>
#app {
	/*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
	/*-webkit-font-smoothing: antialiased;*/
	/*-moz-osx-font-smoothing: grayscale;*/
	text-align: center;
	/*color: #2c3e50;*/
	margin-top: 60px;
}
.column {
    height:700px;
    position:relative;
}
</style>
