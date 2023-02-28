<template>
  <HeaderComponent :token=this.userToken :isUserFetched=this.isUserFetched class="header" @logout="logOut" />
  <div class="content">
    <div class="component-wrapper">
    <router-view :email=this.resetEmail :user=this.userInfo :consoles=this.userConsoles :games=this.userGames :token=this.userToken @emit-info="getUserInfo" @emit-email="passResetEmail" :key="$route.fullPath"/>
  </div>
  <FooterComponent class="footer"/>
  </div>
  
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
      isUserFetched: false,
      resetEmail: ''
    }
  },
  methods: {
    async getUserInfo(userInfo) {
      this.userInfo = userInfo[0].user;
      this.userToken = userInfo[0].token;
      this.userConsoles = userInfo[1];
      this.userGames = userInfo[2];
      this.isUserFetched = userInfo[3];
    },
    logOut(loggedOut) {
      this.isUserFetched = loggedOut;
    },
    passResetEmail(resetEmail) {
      this.resetEmail = resetEmail;
    }
  }

}
</script>

<style>
.component-wrapper {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0a0b0f;
  height: 100%;
  justify-content: flex-start;
  flex:1;
}
@media screen and (max-width: 600px) {
  .component-wrapper {
    width: 100%;
  }
}
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding-bottom: 2.5em;
  flex: 1;
  min-height: fit-content;
  position: relative;
}

.footer {
  position: absolute;
  bottom: 0;
  
}
</style>
