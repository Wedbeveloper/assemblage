<template>
    <div class="header-wrapper">
        <div class="header-logo-wrapper">
            <img src="../../assets/blank-dvd-case-and-disc-png.png" />
        </div>
        
        <div class="header-title-wrapper">
            <h1>Assemblage</h1>
            <h3>Personal Collection Application</h3>
        </div>
        <div class="login-wrapper">
            <div v-if="this.isUserFetched === false" @click="$router.push('/login')" role="button" class="login-button"><p>Login</p></div>
            <div v-if="this.isUserFetched === false" @click="$router.push('/signup')" role="button" class="login-button"><p class="sign-up">Sign-up</p></div>
            <div v-else role="button" class="login-button" @click="logOut()"><p>Log Out</p></div>
            <div class="burgerNavButton" @click="showBurgerNav" role="button" >
                <i class="fa-solid fa-bars"></i>
                <div class="burger-nav-wrapper" :class="burgerNavHidden && 'visible'">
                    <div class="burger-nav-member" @click="$router.push('/')"><p>Home</p></div>
                    <div v-if="this.isUserFetched === true" class="burger-nav-member" @click="$router.push('/manage')"><p>Manage</p></div>
                    <div v-if="this.isUserFetched === false" @click="$router.push('/login')" class="burger-nav-member"><p>Login</p></div>
                    <div v-if="this.isUserFetched === false" @click="$router.push('/signup')" class="burger-nav-member"><p>Sign-up</p></div>
                    <div v-else role="button" @click="logOut()" class="burger-nav-member"><p>Log Out</p></div>
                </div>
            </div>
            
        </div>
    </div>
    <NavBar :isUserFetched="isUserFetched"/>
</template>
<script>

import NavBar from './NavBar.vue';
import axios from 'axios';
export default {
    name: 'HeaderComponent',
    props: ['isUserFetched', 'token'],
    emits: ['logout'],
    inheritAttrs: false,
    components: {
        NavBar
    },
    data() {
        return {
            userSignedIn: this.isUserFetched,
            burgerNavHidden: true
        }
    },
    methods: {
        logOut() {
        let requestAuthHeader = {'content-type':'application/json',Authorization:'Bearer ' + this.token}
        axios.post('https://api.gooeybonez.com/api/logout', '',{headers: requestAuthHeader})
            .then(response => this.pushHome(response.data)).catch((error) => console.log(error))
        },
        pushHome(res) {
            console.log(res);
            this.$router.push('/home')
            this.$emit('logout', false)
        },
        showBurgerNav() {
            this.burgerNavHidden = !this.burgerNavHidden
        }
    }
}
</script>


<style scoped>
* {
    box-sizing: border-box;
}
h1 {
    color: white;
    margin: 0;
    text-align: left;
}
h3 {
    color: #c3c3c3;
    margin: 0;
    border-left: 4px solid white;
    padding-left: 3px;
}

img {
    width: 50px;
}
.header-wrapper {
    display: flex;
    background: rgb(2,0,36);
    background: linear-gradient(49deg,#640000 55%, #171923 55%);
    width: 100%;
    margin: 0;
    border-bottom: 2px solid #640000;
    z-index: 3;
}
@media screen and (max-width: 600px) {
    .header-wrapper {
        background: none;
        background-color: #640000;
    }
}
.header-logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
}
.header-title-wrapper {
    display: flex;
    flex-direction: column;
    
    z-index: 2;
}
.login-wrapper {
    display: flex;
    flex-direction: row;
    margin-left: auto;
    justify-content: center;
    align-items: center;
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
.fa-bars {
    display: none;
    font-size: 30px;
    margin: 5px;
    color: #b0b5bd;
    background-color: #171923;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #b0b5bd;
}
@media screen and (max-width: 600px) {
  .login-button{
    display: none;
  }
  .fa-bars {
    display: block;
}
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
.login-button .sign-up {
    color: #c3c3c3;
}
.burger-nav-button {
    position: relative;
}
.burger-nav-wrapper {
    display: flex;
    flex-direction: column;
    width: 200px;
    padding: 10px;
    position: absolute;
    background-color: black;
    right: 5px;
    border-radius: 3px;
  z-index: 3;
  border: 1px solid #b0b5bd;
    
}
.burger-nav-member {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  text-align: left;
  margin: 5px;
  padding: 10px;
  background: #171923;
  border-radius: 3px;
  cursor: pointer;
}
.burger-nav-member p {
    margin: 0;
}
@media screen and (min-width: 601px) {
    .burger-nav-wrapper {
        display: none;
    }
}
.visible {
    display: none;
}

</style>