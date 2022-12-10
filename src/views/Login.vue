<template>
    <div class="form-wrapper">
      <div class="input-wrapper">
          <label for="email-input">Email:</label>
          <input type="email" name="email-input" v-model="email">

          <label for="password-input">Password</label>
          <input type="password" name="password-input" v-model="password">

          <button @click="(login())">Log In</button>
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
      isUserFetched: false
    }
  },
  methods: {
    async login() {
      let info = {email: this.email, password: this.password};
       axios.post('https://api.gooeybonez.com/api/login', info, {
        headers: {'content-type':'application/json'}
      })
      .then(response => this.handleLoginResponse(response.data)).catch((error) => console.log(error))
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
    height: 100%;
}
.input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: black;
    padding: 50px;
    border-radius: 5px;
}
</style>