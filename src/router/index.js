import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChatRooms from '@/components/ChatRooms.vue'
import ChatRoom from '@/components/ChatRoom.vue'
import ChatRoomCreation from '@/components/ChatRoomCreation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/chat/rooms',
      component: ChatRooms
    },
    {
      path: '/chat/rooms/create',
      component: ChatRoomCreation
    },
    {
      path: '/chat/rooms/:roomId',
      component: ChatRoom
    },
    {
      path: '/about',
      name: 'about',
    
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
