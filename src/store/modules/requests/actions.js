export default {
  contactCoach(context, payload) {
    const newRequest = {
      id: new Date().toISOString(),
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message
    };
    
    //commit : 해당하는 뮤테이션 실행
    context.commit('addRequest', newRequest);
  }
};
