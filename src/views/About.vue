<template>
  <div class="about">
    <h1>This is a login page</h1>
    <button @click="login()">ログイン</button>
  </div>
</template>
<script>
import Auth from '@aws-amplify/auth'
const awsExports = require('@/aws-exports').default
Auth.configure(awsExports)
export default {
  created () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      Auth.currentSession()
        .then(async function (data) {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    login () {
      Auth.federatedSignIn()
    }
  }
}
</script>
