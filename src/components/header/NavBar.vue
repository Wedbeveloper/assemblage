<template>
    <div class="navbar-wrapper">
        <div class="site-links-wrapper"><nav>
            <ul class="site-links">
                <li>
                    <p  @click="$router.push('/')">Home</p>
                    
                </li>
                <li v-if="isUserFetched">
                    <p  @click="$router.push('/manage')">Manage</p>
                </li>
                <li v-if="isUserFetched">
                    <p>View</p>
                </li>
            </ul>
            
        </nav></div>
        <div class="profile-link-wrapper">
            <ul  class="profile-link">
                <li v-if="isUserFetched"><p>My Profile</p></li>
            </ul>
        </div>
        
    </div>
</template>
<script>
    export default {
        props: ['isUserFetched']
    }
</script>

<style scoped>
* {
    box-sizing: border-box;
}
nav {
    height: 100%;
}
.image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.navbar-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 30px;
    background-color: #0a0b0f ;
    margin: 0;
    border-bottom: 1px solid white;
    box-shadow: 0px 2px 32px -2px rgba(0,0,0,1);
    -webkit-box-shadow: 0px 2px 32px -2px rgba(0,0,0,1);
    -moz-box-shadow: 0px 2px 32px -2px rgba(0,0,0,1);
    z-index: 2;
}
@media screen and (max-width: 600px) {
    .navbar-wrapper {
        display: none;
    }
}
.site-links-wrapper {
    display: flex;  
    justify-content: center;
    margin-right: auto;
}
.site-links {
    margin: 0;
    padding: 0;
    height: 100%;
}
.site-links li {
    margin-left:10px;
    height: 100%;
}
.profile-link-wrapper {
    margin-left: auto;
}
.profile-link {
    margin: 0;
    padding: 0;
    padding-top: 7px;
    padding-bottom: 7px;
    width: fit-content;
}

ul {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

ul li {

    margin-left: 5px;
    margin-right: 5px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    color: white;
    height: 100%;
}
li:hover {
    cursor: pointer;
    color: grey;
}

p {
    margin: 0;
}
</style>