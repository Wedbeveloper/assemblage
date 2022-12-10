<template>
    <div class="navbar-wrapper">
        <div class="site-links-wrapper"><nav>
            <ul class="site-links">
                <li >
                    <div class="image-wrapper"><img src="../../assets/reddot.png" width="7px"/><p  @click="$router.push('/')">Home</p></div>
                    
                </li>
                <li>
                    <div class="image-wrapper"><img src="../../assets/reddot.png" width="7px"/><p  @click="$router.push('/manage')">Manage</p></div>
                </li>
                <li>
                    <div class="image-wrapper"><img src="../../assets/reddot.png" width="7px"/><p>View</p></div>
                </li>
            </ul>
            
        </nav></div>
        <div class="profile-link-wrapper">
            <ul  class="profile-link">
                <li><div class="image-wrapper"><img src="../../assets/reddot.png" width="7px"/><p>My Profile</p></div></li>
            </ul>
        </div>
        
    </div>
</template>
<style scoped>
* {
    box-sizing: border-box;
}
.image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}
.navbar-wrapper {
    display: flex;
    width: 100%;
    height: auto;
    background-color: #0a0b0f ;
    margin: 0;
    border-bottom: 1px solid white;
    box-shadow: 0px 2px 32px -2px rgba(0,0,0,1);
    -webkit-box-shadow: 0px 2px 32px -2px rgba(0,0,0,1);
    -moz-box-shadow: 0px 2px 32px -2px rgba(0,0,0,1);
    z-index: 2;
}
.site-links-wrapper {
    margin-right: auto;
}
.site-links {
    margin: 0;
    padding: 0;
    padding-top: 7px;
    padding-bottom: 7px;
    width: fit-content;
}
.site-links li {
    margin-left:10px;
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
}

ul li {
    margin-left: 5px;
    margin-right: 5px;
    display: inline;
    color: white;
}
li:hover {
    cursor: pointer;
    color: grey;
}
li img {
    margin-right: 4px;
}
p {
    margin: 0;
}
</style>