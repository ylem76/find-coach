<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Your E-mail</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="message">Message</label>
        <textarea id="message" rows="5" v-model.trim="message"></textarea>
      </div>
      <p class="errors" v-if="!formIsValid">
        Please enter a valid email and non-empty message
      </p>
      <div class="actions">
        <base-button>
          Send Message
        </base-button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      formIsValid: true
    };
  },
  methods: {
    submitForm() {
      this.formIsvalid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.message === ''
      ) {
        this.formIsValid = false;
        console.log('form is valid: ' + this.formIsValid);
        return;

        //만약 email 이 공란이거나, email에 @가 없거나, message가 공란일 경우 formIsValid는 false
      }

      //리퀘스트 페이지
      //메시지를 보내면 해당 코치가 받아보는 구조
      //vuex에 데이터를 저장한 후 해당 코치에게 보낼 수 있도록 해야한다.
      this.$store.dispatch('requests/contactCoach', {
        email: this.email,
        message: this.message,
        coachId: this.$route.params.id
      });
      this.$router.replace('/coaches');
    }
  }
};
</script>
<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
