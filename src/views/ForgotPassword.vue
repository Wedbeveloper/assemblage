<template>
    <div class="form-wrapper">
      <div class="input-wrapper">
          <div class="greeting-wrapper">
            <h3>Password Reset Request</h3>
            <hr>
          </div>
          <div class="email-password-container">
            <div class="cred-wrapper">
            <label for="email-input"><h4>Email:</h4></label>
            <input class="text-box" type="email" name="email-input" v-model="email">
          </div>
          
        </div>
          <div @click="(submit())" role="button" class="submit-button"><p class="submit-button-text">Send Email</p></div>
          <p class="error-message">{{ response }}</p>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ForgotPasswordView',
  emits: ['emitEmail'],

  data() {
    return {
      email: '',
      response: ''
    }
  },
  methods: {
    async submit() {
      let info = {email: this.email};
       axios.post('http://localhost:8080/https://api.gooeybonez.com/api/forgot-password', info, {
        headers: {'content-type':'application/json'}
      })
      .then(response => this.handleResetResponse(response.data)).catch((error) => [this.response = error])

    },
    handleResetResponse(res) {
      this.response = res;
      console.log(this.response);
      this.$emit('emitEmail', this.email)
      this.$router.push('/reset-password')
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