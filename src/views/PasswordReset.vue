<template>
    <div class="form-wrapper">
      <div class="input-wrapper">
          <div class="greeting-wrapper">
            <h3>Password Reset</h3>
            <hr>
          </div>
          <div class="email-password-container">
            <div class="cred-wrapper">
              <label for="token-input"><h4>Token:</h4></label>
              <input class="text-box" type="text" name="token-input" v-model="token">
              
            </div>
            <hr class="under-token-line">
            <div class="cred-wrapper">
              <label for="password-input"><h4>New Password:</h4></label>
              <input class="text-box" type="password" name="password-input" v-model="password">
            </div>
            <div class="cred-wrapper">
              <label for="retype-password-input"><h4>Retype New Password:</h4></label>
              <input class="text-box" type="password" name="retype-password-input" v-model="retypedPassword">
            </div>
          </div>
          <div @click="(submit())" role="button" class="submit-button"><p class="submit-button-text">Reset Password</p></div>
          <p class="error-message">{{ response }}</p>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'PasswordResetView',
  props: ['email'],

  data() {
    return {
      token: '',
      password: '',
      retypedPassword: '',
      response: ''
    }
  },
  methods: {
    created() {

    },
    async submit() {
      let info = {email: this.email, password: this.password, 'password_confirmation':this.retypedPassword, token: this.token};
       axios.post('https://api.gooeybonez.com/api/reset-password', info, {
        headers: {'content-type':'application/json'}
      })
      .then(response => this.handleResetResponse(response.data)).catch((error) => [this.response = error])

    },
    handleResetResponse(res) {
      this.response = res;
      console.log(this.email)
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
.under-token-line {
  width: 100%; border: 1px solid #640000;
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
.submit-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0a0b0f;
    margin: 5px;
    height: 35px;
    min-width: 90px;
    border: 1px solid #b0b5bd;
    border-radius: 2px;
    margin-bottom: 16px;
    padding-left: 5px;
    padding-right: 5px;
}
.submit-button:hover {
    background-color: #640000;
    cursor: pointer;
}
.submit-button p {
    margin: 0;
    text-align: center;
    color: white;
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