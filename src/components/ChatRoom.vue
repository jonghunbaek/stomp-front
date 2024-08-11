<template>
    <div>
        <h1>Chat Room: {{ roomName }}</h1>
        <div v-if="messages.length">
            <div v-for="message in messages" :key="message.id">
                <strong>{{ message.sender }}:</strong> {{ message.content }}
            </div>
        </div>
        <form @submit.prevent="sendMessage">
            <input v-model="newMessage" placeholder="Type your message" required />
            <button type="submit">Send</button>
        </form>
        <button @click="leaveRoom">Leave Room</button>
    </div>
</template>
  
<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const roomId = route.params.roomId;
        const roomName = ref('');
        const messages = ref([]);
        const newMessage = ref('');
        let stompClient = null;
  
        const connect = () => {
            const socket = new SockJS('/ws');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, () => {
                stompClient.subscribe(`/topic/chat/room/${roomId}`, (message) => {
                messages.value.push(JSON.parse(message.body));
                
                });
            });
        };
  
        const sendMessage = () => {
            if (stompClient && newMessage.value) {
                stompClient.send(
                    `/app/chat/room/${roomId}/message`, 
                    {}, 
                    JSON.stringify({ sender: 'User', content: newMessage.value })
                );
                newMessage.value = '';
            }
        };
  
        const leaveRoom = () => {
            if (stompClient) {
                stompClient.disconnect(() => {
                router.push('/');
            });
            }
        };
  
        onMounted(() => {
            // 방 정보 불러오기 (예시로 하드코딩된 이름 사용)
            roomName.value = `Room ${roomId}`;
            connect();
        });
  
        onBeforeUnmount(() => {
            leaveRoom();
        });
  
        return {
            roomName,
            messages,
            newMessage,
            sendMessage,
            leaveRoom,
        };
    },
};
</script>
  