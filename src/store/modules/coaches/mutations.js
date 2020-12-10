export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
    //payload = formData 해당 배열의 key name 사용 가능
  }
};
