<template>
    <div class="chat-container">
        <div class="chat-window">
            <div v-for="message in messages" :key="message.id" class="message">
            <strong>{{ message.sender }}</strong>: {{ message.content }}
            </div>
        </div>
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
  
export default {
    setup() {
        const messages = ref([]);
        const newMessage = ref('');
        const stompClient = ref(null);
        const username = `User${Math.floor(Math.random() * 1000)}`;
        const connect = () => {
            const socket = new SockJS('http://localhost:8080/ws');
            stompClient.value = Stomp.over(socket);
            
            stompClient.value.connect({}, (frame) => {
                
                console.log('Connected: ' + frame);
                
                stompClient.value.subscribe('/topic/public', (tick) => {
                messages.value.push(JSON.parse(tick.body));
                });
            
                stompClient.value.send("/app/chat.addUser", {}, JSON.stringify({ sender: username, type: 'JOIN' }));
            });
        };
  
    const sendMessage = () => {
        if (newMessage.value && stompClient.value) {
            const chatMessage = {
            sender: username,
            content: newMessage.value,
            type: 'CHAT',
        };
        
        stompClient.value.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        newMessage.value = '';

        }
    };
  
    onMounted(() => {
        connect();
    });
  
    return {
        messages,
        newMessage,
        sendMessage,
    };
    },
};
</script>
  
<style scoped>
.chat-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
}
.chat-window {
    height: 400px;
    overflow-y: scroll;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
}
.message {
    margin-bottom: 10px;
}
input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}
</style>  