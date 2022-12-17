<template>
    <div class="form-wrapper">
      <div class="input-wrapper">
          <div class="greeting-wrapper">
            <h3>Signup to Get Organized!</h3>
          </div>
          <div class="email-password-container">
          <div class="cred-wrapper">
            <label for="email-input"><h4>Email:</h4></label>
            <input class="text-box" type="email" name="email-input" v-model="email">
          </div>
          <div class="cred-wrapper">
            <label for="username-input"><h4>Create a Username:</h4></label>
            <input class="text-box" type="text" name="username-input" v-model="name">
          </div>
          <div class="cred-wrapper">
            <label for="password-input"><h4>Create a Password:</h4></label>
            <input class="text-box" type="password" name="password-input" v-model="password">
          </div>
          <div class="cred-wrapper">
            <label for="password-repeat-input"><h4>Retype Your Password:</h4></label>
            <input class="text-box" type="password" name="password-repeat-input" v-model="password_confirmation">
          </div>
          
        </div>
          <div @click="(registerUser())" role="button" class="register-button"><p class="sign-up">Register</p></div>
          <p class="error-message">{{ error }}</p>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SignupView',
  emits: ['emitInfo'],

  data() {
    return {
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
      userInfo: [],
      isUserFetched: false,
      error: ''
    }
  },
  methods: {
    async registerUser() {
      let info = {email: this.email, name: this.name, password: this.password, password_confirmation: this.password_confirmation};
       axios.post('https://api.gooeybonez.com/api/register', info, {
        headers: {'content-type':'application/json'}
      })
      .then(response => this.handleRegisterResponse(response.data)).catch((error) => [this.error = 'Sorry, that Email or Password was incorrect', console.log(error)])
    },
    handleRegisterResponse(res) {
      this.userInfo.push(res);
      this.userInfo.push([])
      this.userInfo.push([])
      this.isUserFetched = true;
      this.userInfo.push(this.isUserFetched)
      this.$emit('emitInfo', this.userInfo)
      this.$router.push('/manage')
    }
  }
}
</script>

<style scoped>
.form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: black;
    padding: 25px;
    margin-top: 100px;
    border-radius: 5px;
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
  margin-bottom: 5px;
  padding-left: 5px;
  color: white;
}
.text-box {
  width: 200px;
  height: 20px;
}
.register-button {
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
.register-button:hover {
    background-color: #640000;
    cursor: pointer;
}
.register-button p {
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