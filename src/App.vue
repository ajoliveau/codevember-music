<template>
	<div id="app">
		<div class="columns">
			<div class="column">				
                <SongWriters :songWriters="songWriters" :nextSongWriter="nextSongWriter" @click="buyNextSongwriter"></SongWriters>
                <br/>
                <NewSongButton @newSeed="newSeed"></NewSongButton>
			</div>

			<div class="column">
                <Song :songWriters="songWriters" :seed="seed" :nextSongWriter="nextSongWriter"></Song>
			</div>
		</div>
	</div>
</template>

<script>

    
    import SongWriters from './components/SongWriters.vue'    
    import Song from './components/Song.vue'    
    import NewSongButton from './components/NewSongButton.vue'    

	const TICK_RATE = 100; // Tick 10 times per second

	export default {
		name: 'App',
		data() {
			return {	
                // Resources
				money: 100,
                producers: 0,
                songWriters: [
                    "Catherine 1",
                    "Jack 2",
                    "Henrietta 3",
                    "Robert 4",
                    "No more"
                ],
                nextSongWriter: 4,

                seed: "AAAAAA",

                // Game loop
				timeSinceLastTick: 0,
				lastFrameTime: 0,
				binders: [],                
			}
		},
		methods: {	  
            newSeed: function(seed) {
                this.seed = seed;
                window.speechSynthesis.cancel();
            },
            buyNextSongwriter: function() {
                if (this.nextSongWriter < this.songWriters.length - 1) {
                    this.nextSongWriter ++;
                }                
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
            SongWriters,
            Song,
            NewSongButton
		}
	}
</script>

<style>
#app {
	/*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
	/*-webkit-font-smoothing: antialiased;*/
	/*-moz-osx-font-smoothing: grayscale;*/
	/*text-align: center;*/
	/*color: #2c3e50;*/
	margin-top: 60px;
    margin-left: 60px;
}
</style>
