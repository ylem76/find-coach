export default {
  async contactCoach(context, payload) {
    const newRequest = {
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message
    };

    const response = await fetch(
      `https://find-coach-b9529-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send request.'
      );
      throw error;
    }

    // 파이어베이스로 등록을 하게 되면, 파이어베이스에서 자체적으로 ID를 지정해서 생성하게 되는데,
    // 그 데이터를 다시 가져와서 내 로컬로 저장하려 함.
    //newRequest.id 필드에 파이어베이스의 데이터 id를 할당
    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    //commit : 해당하는 뮤테이션 실행
    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    console.log('fetchRequests start');
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://find-coach-b9529-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` +
        token
    );
    const responseData = await response.json();
    console.log('fetchRequests ok');

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch request'
      );
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      };
      requests.push(request);
      context.commit('setRequests', requests);
    }
  }
};
