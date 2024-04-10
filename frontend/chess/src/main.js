import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Page2 from "./pages/Page2.vue";
import Page1 from "./pages/Page1.vue";
import LoginPage from "./pages/LoginPage.vue";

const routes=[
    {path: '/',component: LoginPage},
    {path:'/Page1',component:Page1},
    {path:'/Page2',component: Page2}
]

let Route=createRouter({
    history:createWebHistory(),
    routes
})

const app=createApp(App)
app.use(Route)

app.mount('#app')

