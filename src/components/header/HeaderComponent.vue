<template>
    <div class="header-wrapper">
        <div class="header-logo-wrapper">
            <img src="../../assets/logo.png" />
        </div>
        
        <div class="header-title-wrapper">
            <h1>Assemblage</h1>
            <h3>Personal Collection Application</h3>
        </div>
        <div class="login-wrapper">
            <div @click="$router.push('/login')" role="button" class="login-button"><p>Login</p></div>
            <div role="button" class="login-button"><p class="sign-up">Sign-up</p></div>
        </div>
    </div>
    <NavBar/>
</template>
<script>

import NavBar from './NavBar.vue'
export default {
    components: {
        NavBar
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
</style>