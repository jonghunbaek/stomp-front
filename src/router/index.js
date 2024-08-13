import { createRouter, createWebHistory } from 'vue-router'
import ChatRooms from '@/components/ChatRooms.vue'
import ChatRoom from '@/components/ChatRoom.vue'
import ChatRoomCreation from '@/components/ChatRoomCreation.vue'

const routes = [
  {
    path: '/',
    name: 'chatrooms',
    component: ChatRooms
  },
  {
    path: '/chat/rooms/create',
    name: 'chatroomcreation',
    component: ChatRoomCreation
  },
  {
    path: '/chat/rooms/:roomId',
    name: 'chatroom',
    component: ChatRoom
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router
