<template>
    <div class="form-wrapper">
      <div class="input-wrapper">
          <div class="greeting-wrapper">
            <h3>Log in to Manage Your Collection</h3>
          </div>
          <div class="email-password-container"><div class="cred-wrapper">
            <label for="email-input"><h4>Email:</h4></label>
            <input class="text-box" type="email" name="email-input" v-model="email">
          </div>
          <div class="cred-wrapper">
            <label for="password-input"><h4>Password</h4></label>
            <input class="text-box" type="password" name="password-input" v-model="password">
          </div>
        </div>
          <div @click="(login())" role="button" class="login-button"><p class="sign-up">Log In</p></div>
          <div class="forgot-password-wrapper"><p>Forgot Your Password?</p></div>
          <p class="error-message">{{ error }}</p>
      </div>
      
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LoginView',

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
.form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 700px;
    
}
.input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: black;
    padding-left: 25px;
    padding-right: 25px;
    border-radius: 5px;
    height: 60%;
    width: 300px;
    border: 1px solid white;
    position: relative;
}
.cred-wrapper{
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  
}
h4 {
  margin: 2px;
  text-align: left;
  border-left: 4px solid white;
  margin-left: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 5px;
  color: white;
}
.text-box {
  width: 200px;
  height: 20px;
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
h3 {
  color: #c3c3c3;
}
.error-message {
  color: red;
  position: absolute;
  bottom: 130px;
}
</style>