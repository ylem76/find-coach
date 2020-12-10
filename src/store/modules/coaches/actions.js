export default {
  registerCoach(context, data) {
    const coachData = {
      //id: 'c3', //일단 하드코딩
      id: context.rootGetters.userId,
      //root store state에 저장시킨 userId를 rootGetters로 이동 -> getters에 있는 데이터를 불러옴
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    context.commit('registerCoach', coachData);
  }
};
