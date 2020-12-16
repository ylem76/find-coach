export default {
  requests(state, _, _2, rootGetters) {
    const coachId = rootGetters.userId;
    return state.requests.filter(req => req.coachId === coachId);
    //리퀘스트 목록 코치 id로 필터링 해서 가져오기

    //return state.requests;
    //리퀘스트 목록 전체 가져오기
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;

    //state request의 길이가 0 초과하는 경우 true 리턴
    //다른 경우에는 false 리턴 x
  }
};
