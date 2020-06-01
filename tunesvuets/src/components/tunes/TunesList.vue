<template>

	<transition-group
		tag="ul"
		class="tunes-list"
		name="fade"
	>
		<li
			v-for="song in songs"
			:key="song.id"
		>
			<tunes-song :song="song" />
		</li>
	</transition-group>

</template>


<script lang="ts">
import Vue from 'vue'
import TunesSong from '@/components/tunes/TunesSong.vue'

export default Vue.extend({
	components: {
		TunesSong
	},
	data() {
		return {
			songs: []
		}
	},
	mounted() {
		this.$root.$on('new-songs-have-arrived', data => (this.songs = data))
	}
})
</script>


<style lang="scss" scoped>
.tunes-list {
	margin: 3em 0 0;
	padding-left: 0;
	list-style: none;
}

li:last-child {
	.tunes-song {
		margin-bottom: 1.25em;
	}
}

// animation
.fade-enter-active {
	transition: all 0.25s ease;
}

.fade-enter {
	transform: scale(0.85);
}
</style>