import Vue from 'vue'
import VueRouter from 'vue-router'

// views
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Tunes from '../views/Tunes.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/tunes',
		name: 'tunes',
		component: Tunes
	},
	{
		path: '/about',
		name: 'about',
		component: About
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
