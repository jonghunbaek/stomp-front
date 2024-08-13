<template>
	<main id="main">
			<RouterView></RouterView>
	</main>
</template>

<script>
import { RouterLink, RouterView} from 'vue-router';

export default {
  components: { 
    RouterView, RouterLink 
  },

  setup() {
    return {};
  }
};
</script>

<style>
#main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

