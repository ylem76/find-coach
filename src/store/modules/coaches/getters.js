export default {
  coaches(state) {
    return state.coaches;
    //store.modules.coaches.index.js에 저장된 코치 데이터를 getters로 가져오기
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    // _ : 다른 인자를 작성하기 위해, 자리는 차지하되 내용은 불러오지 않도록 대신 사용하는 문자
    const coaches = getters.coaches;
    //isCoach로 getters의 coaches 데이터 가져오기 = store.modules.coaches.index.js에 저장된 코치 데이터와 동일
    const userId = rootGetters.userId;
    //rootGetters의 userId 값 가져오기
    return coaches.some(coach => coach.id === userId);
    //coach목록에서 id를 rootGetters에서 가져온 userId로 변경하기
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }

    const currentTimestamp = new Date().getTime();
    return (currentTimestamp - lastFetch) / 1000 > 60;
  }
};
