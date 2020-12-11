<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <!--hasRequests가 참일 때 ul 렌더링 -->
      <request-item
        v-for="req in receivedRequests"
        :key="req.id"
        :email="req.userEmail"
        :message="req.message"
      >
      </request-item>
      <ul v-if="hasRequests"></ul>
      <h3 v-else>no messages...</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  components: {
    RequestItem
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests'];
      //this.$store.getters['네임스페이스 이름/getters 이름'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    }
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
