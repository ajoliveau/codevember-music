<template>
	<div>
		<div class="lyrics">
			<!-- <div class="button" v-on:click="$emit('sellSong')">Sell Song (+1000$)</div> -->
			<br/>
			<br/>
			<div class="button" v-if="singing" v-on:click="stopSing">Stop Singing</div>
			<div class="button" v-else v-on:click="sing">Sing</div>
			<br/>
			<br/>
			<FormattedLyrics v-if="nextSongWriter !== 0" :lyrics="lyrics"></FormattedLyrics>
			
			
		</div> 
		
	</div>    
</template>

<script>

	import SongData from '../data/SongData'
	import FormattedLyrics from './FormattedLyrics.vue'

	export default {
		name: 'Song',
		props: {        
			hitStyle: {
				type: Object,
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
				audio: null,

				songs: [
				{
					file: "track1.mp3",
					duration: 178
				},
				{
					file: "track2.mp3",
					duration: 159
				},
				{
					file: "track3.mp3",
					duration: 156
				},
				{
					file: "track4.mp3",
					duration: 152
				},
				{
					file: "track5.mp3",
					duration: 144
				},
				{
					file: "track6.mp3",
					duration: 146
				},
				{
					file: "track7.mp3",
					duration: 143
				},
				{
					file: "track8.mp3",
					duration: 139
				},
				{
					file: "track9.mp3",
					duration: 133
				},
				{
					file: "track10.mp3",
					duration: 130
				},
				{
					file: "track11.mp3",
					duration: 119
				},
				{
					file: "track12.mp3",
					duration: 110
				},
				{
					file: "track13.mp3",
					duration: 224
				},
				{
					file: "track14.mp3",
					duration: 154
				},

				],
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
			},
            singableLyrics() {
                let chorus = [];
                let singableLyrics = [];
                this.lyrics.text.forEach((verse) => {                    
                    if (verse.type == 'chorus') {
                        if (!chorus.length) {                            
                            verse.text.forEach((line) =>  {
                                const random = Math.random();
                                if (chorus.length && random > 0.8) {
                                    chorus[chorus.length - 1] += ' ' + line;
                                }
                                else if (chorus.length && random > 0.5) {
                                    chorus[chorus.length - 1] += ', ' + line;
                                }
                                else {
                                    chorus.push(line);                                    
                                }
                            });
                        }                         
                        singableLyrics = singableLyrics.concat(chorus);
                    }
                    else {
                        verse.text.forEach((line) =>  {
                            const random = Math.random();
                            if (singableLyrics.length && random > 0.8) {
                                singableLyrics[singableLyrics.length - 1] += ' ' + line;
                            }
                            else if (singableLyrics.length && random > 0.5) {
                                singableLyrics[singableLyrics.length - 1] += ', ' + line;
                            }
                            else {
                                singableLyrics.push(line);
                            }
                        });
                    }
                });                
                return singableLyrics;
            }
		},
		methods: {   
			playMusic() {
				const song = this.songs[Math.floor(Math.random()*this.songs.length)];
				this.audio = new Audio(require('../assets/' + song.file));
				this.audio.currentTime = Math.floor(Math.random() * song.duration * 0.7);
				this.audio.volume = 0.8
				this.audio.play();
				const buttons = document.querySelectorAll('.button');
				buttons.forEach((button) => {
					button.classList.add('pulse');
				})
			},
			stopSing() {
				this.singing = false;
				this.synth.cancel();
				this.audio.pause();			
				const buttons = document.querySelectorAll('.button');
				buttons.forEach((button) => {
					button.classList.remove('pulse');
				})	
			},
			sing() {		
				this.singing = true;
                const voices = this.synth.getVoices().filter(voice => voice.lang.includes('en'));
                const voice = voices[Math.floor(Math.random() * voices.length)];
                
				this.singableLyrics.forEach((line) =>  {
                    let utterance = new SpeechSynthesisUtterance(line);
                    let pitch = Math.random() * (1.5 - 0.8) + 0.8;
                    utterance.pitch = pitch ;
                    // utterance.voice = voice ;
					this.synth.speak(utterance);					
				})			
				this.playMusic();				
			},                  
			generateSong() {	
				
				this.singing = false;

				let lyrics = {
					skipTypeDisplay: this.hitStyle.skipTypeDisplay,
					text: []
				};

				let chorus = null;

				this.hitStyle.type.forEach((type) => {
					let text = [];
					if (type === 'chorus') {	
						if (chorus) {
							text = chorus;
						} else {
							for (var i = 0; i < this.hitStyle.chorusSize; i++) {
								text.push(this.getRandomLyric());
							}
							chorus = text;	
						}					

					} else if (type === 'verse') {
						for (var j = 0; j < this.hitStyle.verseSize; j++) {
							text.push(this.getRandomLyric(this.nextSongWriter));
						}
					}

					lyrics.text.push({
						type: type,
						text: text
					});

				});						
				
				return lyrics;

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

</style>
