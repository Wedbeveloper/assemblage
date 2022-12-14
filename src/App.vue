<template>
  <HeaderComponent :token=this.userToken :isUserFetched=this.isUserFetched class="header" @logout="logOut" />
  <div class="content">
    <router-view :user=this.userInfo :consoles=this.userConsoles :games=this.userGames :token=this.userToken @emitInfo="getUserInfo" :key="$route.fullPath"/>
  </div>
  <FooterComponent class="footer"/>
</template>

<script>

import HeaderComponent from './components/header/HeaderComponent.vue'
import FooterComponent from './components/footer/FooterComponent.vue';

export default {
  name: 'App',

  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      userInfo: {},
      userToken: '',
      userConsoles: [],
      userGames: [],
      isUserFetched: false
    }
  },
  methods: {
    async getUserInfo(userInfo) {
      console.log(userInfo)
      this.userInfo = userInfo[0].user;
      this.userToken = userInfo[0].token;
      this.userConsoles = userInfo[1];
      this.userGames = userInfo[2];
      this.isUserFetched = userInfo[3];
      console.log("Logged in?: " + this.isUserFetched)
    },
    logOut(loggedOut) {
      this.isUserFetched = loggedOut;
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding-bottom: 2.5em;
}

.footer {
  position: absolute;
  bottom: 0;
  
}
</style>
