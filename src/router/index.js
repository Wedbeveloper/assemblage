import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue'
import Manage from '../views/Manage.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: Home
    },
    {
        path: '/home',
        name: 'HomeView',
        component: Home
    },
    {
        path: '/manage',
        name: 'ManageView',
        component: Manage
    },
    {
        path: '/login',
        name: 'LoginView',
        component: Login
    },
    {
        path: '/signup',
        name: 'SignupView',
        component: Signup
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;