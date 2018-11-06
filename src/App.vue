<template>
	<div id="app">
		<div class="columns">
			<div class="column">	
                Money : {{ money }}$			
                <br/>
                <SongWriters :songWriters="songWriters" :nextSongWriter="nextSongWriter" @click="buyNextSongwriter"></SongWriters>
                <br/>

                <b-select v-model="hitStyle" v-on:input="styleChange" placeholder="Select a style">
                    <option
                    v-for="(style, id) in styles"
                    :value="id"
                    :key="id">
                    {{ style.name }}
                </option>
            </b-select>
            <br/>
            <NewSongButton @newSeed="newSeed"></NewSongButton>
        </div>

        <div class="column">
            <Song :hitStyle="styles[hitStyle]" :seed="seed" :nextSongWriter="nextSongWriter" v-on:sellSong="sellSong"></Song>
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
                    "Sarah Aarons",
                    "Tobias Jesso Jr.",
                    "Savan Kotecha",
                    "Benny Blanco",
                    "Starrah",
                    "Jacob “JKash” Kasher",
                    "Hillary Lindsey",
                    "Stargate",
                    // "Sia",
                    // "Justin Tranter and Julia Michaels",
                    // "Pop &amp; Oak",
                    // "Greg Kurstin",
                    // "Metro Boomin",
                    // "Max Martin",
                    // "James Fauntleroy",
                    // "Erika Ender",
                    // "Mike Will Made It",
                    // "Jack Antonoff",
                    // "Ricky Reed",
                    // "Steve Mac",
                    "No more"
                ],
                nextSongWriter: 1,
                seed: "AAAAAA",
                hitStyle: 0,
                styles: [
                {
                    id: "standard",
                    name: "Standard",
                    type : ["chorus", "verse", "chorus", "verse", "chorus", "verse"],
                    verseSize: 5,
                    chorusSize: 3,
                    skipTypeDisplay: false,
                },
                {
                    id: "simple-pop-song",
                    name: "Simple Pop Song",
                    type : ["verse", "verse","verse","verse","verse","verse","verse","verse","verse","verse"],
                    verseSize: 1,
                    skipTypeDisplay: true,
                },                    
                {
                    id: "one-line-hit",
                    name: "One Line Hit",
                    type : ["chorus", "chorus","chorus","chorus","chorus","chorus","chorus","chorus","chorus","chorus"],
                    chorusSize: 1,
                    skipTypeDisplay: true,
                },                    
                {
                    id: "pop-poetry",
                    name: "Pop Poetry",
                    type : ["verse", "verse", "verse", "verse" ],
                    verseSize: 8,
                    skipTypeDisplay: true,
                },
                ],

                // Game loop
                timeSinceLastTick: 0,
                lastFrameTime: 0,
                binders: [],                
            }
        },
        methods: {	  
            styleChange: function(e) {
                this.hitStyle = e;
            },
            sellSong: function() {
                this.money += 1000;
                this.newSeed();
            },
            newSeed: function() {
                this.seed = Math.random().toString(36).substring(7);
                window.speechSynthesis.cancel();
            },
            buyNextSongwriter: function() {
                if (this.nextSongWriter < this.songWriters.length - 1 && this.money >= 200) {
                    this.nextSongWriter ++;
                    this.money -= 200;
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

.pulse {
    animation-name: pulse_animation;
    animation-duration: 1000ms;
    transform-origin:70% 70%;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}

@keyframes pulse_animation {
    0% { transform: scale(1); }
    
    50% { transform: scale(1.2); }
    
    100% { transform: scale(1); }
}
</style>
