<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>
<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('coaches/registerCoach', data);
      //action 이름, 데이터

      //this$router.push('/coaches');//뒤로가기 가능
      this.$router.replace('/coaches'); //뒤로가기 불가능
    }
  }
};
</script>
