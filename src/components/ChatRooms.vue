<template>
    <div>
        <h1>Chat Rooms</h1>
        <button @click="goToCreateRoom">Create New Room</button>
        <ul>
            <li v-for="room in chatRooms" :key="room.id">
                <router-link :to="'/room/' + room.id">{{ room.name }} ({{ room.capacity }} members)</router-link>
            </li>
        </ul>
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
  
export default {
    setup() {
        const chatRooms = ref([]);
  
        const fetchChatRooms = async () => {
            const response = await axios.get('/api/chat/rooms');
            chatRooms.value = response.data;
        };
  
        const goToCreateRoom = () => {
            router.push('/create');
        };
  
        onMounted(() => {
            fetchChatRooms();
        });
  
        return {
            chatRooms,
            goToCreateRoom,
        };
    },
  };
  </script>