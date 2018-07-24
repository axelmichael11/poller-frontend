const superagent = require('superagent');


export const feedBackSend = (feedback) => (dispatch, getState) => {
    let { auth0Token } = getState();
    return superagent
        .post(`${__API_URL__}/api/feedback`)
        .set('Authorization', `Bearer ${auth0Token}`)
        .send(feedback)
        .then(res => {
            let parsed = JSON.parse(res.text)
            parsed.status=res.status
            return parsed
        })
  }