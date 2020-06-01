<template>

	<form @submit.prevent="getMusic()">
		<input
			@input="search()"
			v-model="query"
			type="text"
			ref="input"
		/>
	</form>

</template>


<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { debounce } from 'lodash-es'
import { Song } from '@/types'

export default Vue.extend({
	data() {
		return {
			query: '' as string
		}
	},
	methods: {
		getMusic(): void {
			axios
				.get(
					`https://itunes.apple.com/search?term=${encodeURI(this.query)}
					&entity=musicTrack
					&limit=5`
				)
				.then(response => {
					let iTunesSongs: Song[] = response.data.results
						.filter((song: any) => song.kind === 'song')
						.map((song: any) => this.extractData(song))

					this.$root.$emit('new-songs-have-arrived', iTunesSongs)
				})
		},
		search: debounce(function() {
			this.getMusic()
		}, 500),
		extractData({
			trackId: id,
			artistName: artist,
			previewUrl: audioFile,
			artworkUrl100: artwork,
			trackName: title,
			collectionName: album
		}) {
			return { id, artist, audioFile, artwork, title, album } as Song
		}
	},
	mounted() {
		this.$refs.input.focus()
	}
})
</script>


<style lang="scss" scoped>
input {
	width: 100%;
	display: block;

	padding: {
		top: 0.5em;
		bottom: 0.5em;
		left: 2.95em;
		right: 0.75em;
	}

	color: #333;
	font-size: 1.5em;
	font-weight: 700;

	border: none;
	border-radius: 0.5em;
	background: white;
	box-sizing: border-box;

	outline: none;
	appearance: none;

	background: {
		image: url('../../assets/search.svg');
		repeat: no-repeat;
		position-y: 50%;
		position-x: 1em;
		color: white;
		size: 1em;
	}
}

@media screen and (max-width: 520px) {
	input {
		font-size: 1.15em;
	}
}
</style>
