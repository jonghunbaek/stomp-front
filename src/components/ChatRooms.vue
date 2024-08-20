<template>
    <div>
        <div class="row">
            <div class="col-6">
                <h1>채팅방 목록</h1>
            </div>
            <div class="col-6">
                <button class="btn btn-primary" @click="goToCreateRoom">채팅방 생성</button>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>채팅방 이름</th>
                    <th>참여 가능 인원</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(chattingRoom, index) in state.chattingRooms" :key="chattingRoom.roomId">
                    <td>{{ index + 1 }}</td>
                    <td>
                        <router-link :to="'/chat/rooms/' + chattingRoom.roomId">{{ chattingRoom.roomName }}</router-link>
                    </td>
                    <td>{{ chattingRoom.capacity }}명</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        const state = reactive({
            chattingRooms: []
        });

        const fetchChatRooms = async () => {
            const response = await axios.get("/api/chatting-rooms");
            console.log("data");
            console.log(response.data);
            state.chattingRooms = response.data;
            console.log(state.chattingRooms);
        };

        const goToCreateRoom = () => {
            router.push("/chat/rooms/create");
        };

        onMounted(() => {
            fetchChatRooms();
        });

        return {
            state,
            goToCreateRoom,
        };
    },
};
</script>

<style>
.table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}

.table th, .table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

.table th {
    background-color: #f2f2f2;
    font-weight: bold;
}

.table tr:hover {
    background-color: #f1f1f1;
}
</style>
