export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      //id: 'c3', //일단 하드코딩
      //id: context.rootGetters.userId,
      //root store state에 저장시킨 userId를 rootGetters로 이동 -> getters에 있는 데이터를 불러옴
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    //파이어베이스에서 데이터 가져오기
    //상단에 만든 const userId 자바코드를 사용할 수 있도록 ``따옴표 변경
    //promise, .then(), .catch()등을 이용할 수도 있지만
    //이번에는 좀더 모던한 코드인 async와 await사용
    // ` 를 이용해 자바스크립트 신택스 사용
    // 아이디 하나 당
    //put : 만약 데이터가 있다면 덮어씌운다. 없으면 새항목이 추가됨
    //post는 무조건 새로운 것이 추가됨
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://find-coach-b9529-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` +
        token,
      {
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    );

    //const responseData = await response.json();

    if (!response.ok) {
      //error ...
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId
    });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://find-coach-b9529-default-rtdb.firebaseio.com/coaches.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      // response ok가 아닐때 = 에러
      const error = new Error(responseData.message || 'Failed to fetch');
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };
      //responseData[key] = id 'c3'
      //id 하단에 아래의 내용이 저장되어있다.
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  }
};
