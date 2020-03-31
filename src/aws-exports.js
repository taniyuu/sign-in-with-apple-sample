import Auth from '@aws-amplify/auth'

const config = {
  Auth: {
    identityPoolId: process.env.VUE_APP_IDENTITY_POOL_ID,
    region: process.env.VUE_APP_REGION,
    userPoolId: process.env.VUE_APP_USERPOOL_ID,
    userPoolWebClientId: process.env.VUE_APP_USERPOOL_CLIENT_ID,
    oauth: {
      domain: process.env.VUE_APP_COGNITO_DOMAIN,
      scope: ['profile', 'openid', 'aws.cognito.signin.user.admin', 'email'],
      redirectSignIn: 'http://localhost:8080/callback',
      redirectSignOut: 'http://localhost:8080/login',
      responseType: 'code'
    }
  }
}
Auth.configure(config)
/* export async function getCurrentUserInfo () {
  const user = await Auth.currentAuthenticatedUser({ bypassCache: true })
  return user
} */
