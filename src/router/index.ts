import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Clients from '../views/Clients.vue'
import Vehicles from '../views/Vehicles.vue'
import Services from '../views/Services.vue'
import Offers from '../views/Offers.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/clients',
      name: 'clients',
      component: Clients
    },
    {
      path: '/vehicles',
      name: 'vehicles',
      component: Vehicles
    },
    {
      path: '/services',
      name: 'services',
      component: Services
    },
    {
      path: '/offers',
      name: 'offers',
      component: Offers
    }
  ]
})

export default router