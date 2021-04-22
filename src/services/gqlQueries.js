export const attentionQuery = "";
export const loginQuery = `mutation {
  login(email: "${process.env.REACT_APP_API_CREDENTIAL_USER}", password: "${process.env.REACT_APP_API_CREDENTIAL_PASS}") {
    token
  }
}`
export const emotionQuery = `query {
  clientProfile {
    orders {
      analytics {
        emotion {
          details {
            media {
              media_time,
              media_preview
            },
            data {
              all {
                all {
                  fear,
                  anger,
                  sadness,
                  surprise,
                  disgust,
                  happiness
                }
              }
            }
          }
        }
      }
    }
  }
}`;
