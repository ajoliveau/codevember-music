<template>
	<div>
		<div class="lyrics">
			<div class="button">Sell Song</div>
			<br/>
			<div class="button" v-if="singing" v-on:click="stopSing">Stop Singing</div>
			<div class="button" v-else v-on:click="sing">Sing</div>
			<br/>
			<FormattedLyrics :lyrics="lyrics"></FormattedLyrics>
			
			
		</div> 
		
	</div>    
</template>

<script>

	import SongData from '../data/SongData'
	import FormattedLyrics from './FormattedLyrics.vue'

	export default {
		name: 'Song',
		props: {                    
			songWriters: {
				type: Array,
				required: true
			},
			nextSongWriter: {
				type: Number,
				required: true
			},
			seed: {
				type: String,
				required: true
			},         
		},
		data() {
			return {
				verseNum: 3,
				verseSize: 5,
				chorusSize: 3,
				synth: window.speechSynthesis,
				singing: false,
			}
		},      
		computed: {    
			lyrics() {
				return this.generateSong(this.seed);
			},			
			availableLyrics() {
				let lyrics = [];
				for (var i = 0; i < this.nextSongWriter; i++) {
					lyrics = lyrics.concat(SongData[i]);
				}
				return lyrics;
			}
		},
		methods: {   
			stopSing() {
				this.singing = false;
				this.synth.cancel();
			},
			sing() {
				this.singing = true;
				this.lyrics.chorus.forEach((line) =>  {
					this.synth.speak(new SpeechSynthesisUtterance(line));

				})
				this.lyrics.verses.forEach((verse) =>  {
					verse.forEach((line) =>  {
						this.synth.speak(new SpeechSynthesisUtterance(line));
					});		


					this.lyrics.chorus.forEach((line) =>  {
						this.synth.speak(new SpeechSynthesisUtterance(line));

					})			

				})

			},                  
			generateSong() {	
			this.singing = false;			
				let chorus = [];
				for (var i = 0; i < this.chorusSize; i++) {
					chorus.push(this.getRandomLyric());
				}			

				let verses = [];
				for (var i = 0; i < this.verseNum; i++) {
					let verse = []
					for (var j = 0; j < this.verseSize; j++) {
						verse.push(this.getRandomLyric(this.nextSongWriter));
					}
					verses.push(verse);
				}
				return  {
					"chorus": chorus,
					"verses": verses,
				}

			},
			getRandomLyric() {
				return this.availableLyrics[Math.floor(Math.random() * this.availableLyrics.length)];
			}
		},
		components: {
			FormattedLyrics
		}
	}
</script>

<style>
.lyrics {
	white-space: pre-line;
}
</style>
