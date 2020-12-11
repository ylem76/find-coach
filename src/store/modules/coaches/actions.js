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
    const response = await fetch(`https://ylem76-blog.firebaseio.com/coaches/${userId}.json`, {
      method: 'PUT',
      body: JSON.stringify(coachData)
    });

    const responseData = await response.json();

    if(!response.ok) {
      //error ...
    }





    context.commit('registerCoach', {
      ...coachData,
      id:userId

    });
  }
};

