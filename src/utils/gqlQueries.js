export const loginQuery = `mutation {
  login(email: "${process.env.REACT_APP_API_CREDENTIAL_USER}", password: "${process.env.REACT_APP_API_CREDENTIAL_PASS}") {
    token
  }
}`;
export const emotionQuery = `query {
  clientProfile {
    orders {
      orderName,
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
                  fear, [0,10,0,1,0,0,0,0,]
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
export const attentionQuery = `query {
  clientProfile {
    orders{
      orderName 
      analytics {
        attention {
          attention_score,
          heatmap {
            thumbnail
          },
          details {
            data {
              all {
                all {
                  distance
                }
              }
            }
            media {
              media_preview,
              media_time,
            }
          }
        }
      }
    }
  }
}`;
