export default {
  addRequest(state, payload) {
    //payload : which in the end will hold the request data
    state.requests.push(payload);
  }
};
