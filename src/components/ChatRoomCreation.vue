<template>
    <div class="container">
        <h1 class="text-center my-4">채팅방 생성</h1>
        <form @submit.prevent="createRoom" class="mx-auto w-50">
            <div class="row">
                <div class="input-group mb-3 col-6">
                    <span class="input-group-text" id="inputGroup-sizing-default">채팅방 이름</span>
                    <input v-model="name" id="name" required type="text" class="form-control">
                </div>
                <div class="input-group mb-3 col-6">
                    <span class="input-group-text" id="inputGroup-sizing-default">참여인원 수</span>
                    <input v-model.number="capacity" id="capacity" type="number" required class="form-control">
                </div>
            </div>
            <p v-if="capacity > 10" class="text-danger text-center">참여 인원 수는 최대 10명까지 가능합니다.</p>
            <button class="btn btn-light d-block mx-auto" type="submit" :disabled="capacity > 10">생성</button>
        </form>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
  
export default {
    setup() {
        const name = ref('');
        const capacity = ref(10);
        const router = useRouter();
  
        const createRoom = async () => {
            await axios.post('/api/chatting-rooms', {
                name: name.value,
                capacity: capacity.value,
            });

            router.push('/');
        };
  
        return {
            name,
            capacity,
            createRoom,
        };
    },
};
</script>  