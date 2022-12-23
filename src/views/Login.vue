<template>
    <div class="form-wrapper">
      <div class="input-wrapper">
          <div class="greeting-wrapper">
            <h3>Log in to Manage Your Collection</h3>
            <hr>
          </div>
          <div class="email-password-container">
            <div class="cred-wrapper">
            <label for="email-input"><h4>Email:</h4></label>
            <input class="text-box" type="email" name="email-input" v-model="email">
          </div>
          <div class="cred-wrapper">
            <label for="password-input"><h4>Password</h4></label>
            <input class="text-box" type="password" name="password-input" v-model="password">
          </div>
        </div>
          <div @click="(login())" role="button" class="login-button"><p class="sign-up">Log In</p></div>
          <div @click="$router.push('/forgot-password')" class="forgot-password-wrapper"><p>Forgot Your Password?</p></div>
          <p class="error-message">{{ error }}</p>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LoginView',
  emits: ['emitInfo'],

  data() {
    return {
      email: '',
      password: '',
      userInfo: [],
      isUserFetched: false,
      error: ''
    }
  },
  methods: {
    created() {

    },
    async login() {
      let info = {email: this.email, password: this.password};
       axios.post('https://api.gooeybonez.com/api/login', info, {
        headers: {'content-type':'application/json'}
      })
      .then(response => this.handleLoginResponse(response.data)).catch((error) => [this.error = 'Sorry, that Email or Password was incorrect', console.log(error)])
    },
    async getUserConsoles(userId) {
      let url = 'https://api.gooeybonez.com/api/consoles/' + userId
       axios.get(url, {
        headers: {'content-type':'application/json'}
      })
      .then(response => this.handleConsoleResponse(response.data)).catch((error) => console.log(error))
    },
    async getUserGames(userId) {
      let url = 'https://api.gooeybonez.com/api/games/' + userId
       axios.get(url, {
        headers: {'content-type':'application/json'}
      })
      .then(response => this.handleGameResponse(response.data)).catch((error) => console.log(error))
    },
    
    handleLoginResponse(res) {
      this.userInfo.push(res);
      this.getUserConsoles(this.userInfo[0].user.id)
    },
    handleConsoleResponse(res) {
      this.userInfo.push(res)
      this.getUserGames(this.userInfo[0].user.id)
    },
    handleGameResponse(res) {
      this.userInfo.push(res);
      this.isUserFetched = true;
      this.userInfo.push(this.isUserFetched)
      this.$emit('emitInfo', this.userInfo)
      this.$router.push('/manage')
    },
    
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;  
}
.greeting-wrapper {
  width: 100%;
}
.input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  border: 1px solid white;
  width: 100%;
  background-color: #171923;
  max-width: 300px;
}
.cred-wrapper{
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  
}
.email-password-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
}
h4 {
  margin: 2px;
  text-align: left;
  border-left: 4px solid white;
  margin-bottom: 5px;
  margin-top: 10px;
  padding-left: 5px;
  color: white;
}
.text-box {
  height: 30px;
  width: 100%;
}
.login-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0a0b0f;
    margin: 5px;
    height: 35px;
    min-width: 90px;
    border: 1px solid #b0b5bd;
    border-radius: 2px;
}
.login-button:hover {
    background-color: #640000;
    cursor: pointer;
}
.login-button p {
    margin: 0;
    text-align: center;
    color: white;
}
.forgot-password-wrapper {
    color: #b0b5bd;
}
.forgot-password-wrapper p:hover {
  color: #640000;
  cursor: pointer;
}
h3 {
  color: #c3c3c3;
  text-align: center;
}
.error-message {
  color: red;
  position: absolute;
  bottom: 130px;
}
hr {
  border: 1px solid #b0b5bd

}
</style>