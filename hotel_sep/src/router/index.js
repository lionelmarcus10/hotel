
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Services from '@/views/Services.vue';
import Decouvrir from '@/views/Decouvrir.vue';
import Conference from '@/views/Conferences.vue';
import Chambre from '@/components/Chambres.vue';
import Reserve from '@/views/Reserve.vue';
const  router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home, name: 'Accueil' },
        { path: '/decouvrir', component: Decouvrir, name: 'Decouvrir' },
        { path: '/chambre', component: Chambre, name: 'Chambre' },
        { path: "/services", component: Services, name: "Services" },
        { path: '/conferences', component: Conference, name: 'Conference' },
        { path: '/reserve', component: Reserve , name: 'Reserver'}
    ],
    })

export default router