
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Services from '@/views/Services.vue';
import Decouvrir from '@/views/Decouvrir.vue';
import Conference from '@/views/Conferences.vue';
import Chambre from '@/components/Chambres.vue';
import Reserve from '@/views/Reserve.vue';
import ConnectUser from '@/views/ConnectUser.vue';
import CreateUser from '@/views/CreateUser.vue';
const  router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home, name: 'Accueil' },
        { path: '/decouvrir', component: Decouvrir, name: 'Decouvrir' },
        { path: '/chambres-disponible', component: Chambre, name: 'Chambres' },
        { path: "/services", component: Services, name: "Services" },
        { path: '/conferences', component: Conference, name: 'Conference' },
        { path: '/reservations', component: Reserve , name: 'Reservations'},
        { path: "/sign-in", component: ConnectUser, name: "Connexion" },
        { path: "/sign-up", component: CreateUser, name: "Inscription"}
    ],
    })

export default router