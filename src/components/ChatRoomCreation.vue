<template>
    <div>
        <h1>Create Chat Room</h1>
        <form @submit.prevent="createRoom">
            <div>
                <label for="name">Room Name</label>
                <input v-model="name" id="name" required />
            </div>
            <div>
                <label for="capacity">Capacity</label>
                <input v-model.number="capacity" id="capacity" type="number" required />
            </div>
            <button type="submit">Create Room</button>
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
            await axios.post('/api/chat/rooms', {
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