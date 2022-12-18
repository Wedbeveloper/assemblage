<template>
  <HeaderComponent :token=this.userToken :isUserFetched=this.isUserFetched class="header" @logout="logOut" />
  <div class="content">
    <div class="component-wrapper">
    <router-view :user=this.userInfo :consoles=this.userConsoles :games=this.userGames :token=this.userToken @emit-info="getUserInfo" :key="$route.fullPath"/>
  </div>
  </div>
  <FooterComponent class="footer"/>
</template>

<script>

import HeaderComponent from './components/header/HeaderComponent.vue'
import FooterComponent from './components/footer/FooterComponent.vue';

export default {
  name: 'App',
  inheritAttrs: false,

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
.component-wrapper {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0a0b0f;
  height: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding-bottom: 2.5em;
  height: 100%;
  min-height: fit-content;
}

.footer {
  position: absolute;
  bottom: 0;
  
}
</style>
