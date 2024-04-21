import { createApp } from 'vue'

import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'


import LoginPage from "./pages/LoginPage.vue";
import FightingPage from "./pages/FightingPage.vue";

import MatchPage from "./pages/MatchPage.vue";
import CenterPage from "./pages/CenterPage.vue";
import RankPage from "./pages/RankPage.vue";
const routes=[
    {path: '/',component: LoginPage},
    {path:'/Fight',component:FightingPage},
    {path: '/Match',component: MatchPage},
    {path: '/Rank',component: RankPage},
    {path: '/Center',component: CenterPage}

]

let Route=createRouter({
    history:createWebHistory(),
    routes
})

const app=createApp(App)
app.use(Route)

app.mount('#app')

