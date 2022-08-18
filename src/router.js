import Vue from "vue";
import VueRouter from "vue-router";
// import HomeHeader from "./components/HomeHeader";
// import BookInput from "./components/BookInput";
import BookList from "./components/book/BookList";
import SearchList from './components/book/SearchList';
import SelectPosition from './components/login/SelectPosition'
import NewLogin from './components/login/NewLogin'
// import App from './App.vue'
import MyPage from './components/mypage/MyPage'
import MyWishBook from './components/mypage/MyWishBook'
import MyReadBook from './components/mypage/MyReadBook'


Vue.use(VueRouter);

export const router = new VueRouter({
    mode:'history',
    routes:[
        // { path: '/', component: App},
        // { path: '/home', component: HomeHeader},
        // { path: '/home', component: BookInput},
        { path: '/', component: BookList},
        { path: "/search", component: SearchList},
        { path: "/selectPosition", component: SelectPosition},
        { path: "/init", component:NewLogin},
        { path: "/mypage", 
          component:MyPage,

            children:[
                {
                    // name:'mypage-read',
                    path:'read',
                    component:MyReadBook
                },
                {
                    // name:'mypage-wish',
                    path:'wish',
                    component:MyWishBook
                }
            ]
        },
        // { path: "/mywish", component:MyWishBook},
        // { path: "/myread", component:My}

    ]

})

