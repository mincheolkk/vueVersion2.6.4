import Vue from "vue"
import Vuex from "vuex"
import ApiService from "./index";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        resultList: [],
        searchList: [],
        kakaoData: "",
        loginMember: null,
        readBook: {},
        wishBookList: [],
    },

    getters: {
        getResultList: (state) => {
            return state.resultList;
        },
        getSearchList: (state) => {
            return state.searchList;
        },
        getLoginMember(state) {
            return state.loginMember;
        },
        isLoggedIn(state) {
            return state.loginMember !== null;
        },
        getReadBook(state) {
            return state.readBook;
        },
        getWishBook: (state) => {
            return state.wishBookList;
        },
    },

    mutations: {
        setResultList(state, resultList) {
            state.resultList = resultList;
        },
        setSearchList(state, searchList) {
            console.log("search ++ =" + searchList);
            state.searchList = searchList;
        },
        setLoginMember(state, res) {
            state.loginMember = res;
        },
        setLogOutMember(state) {
            state.loginMember = null;
        },
        setReadBook(state, res) {
            state.readBook = res;
        },
        setWishBook(state, res) {
            state.wishBookList = res;
        }
    },

    actions: {
        async fetchAllBooks({commit}){
            const res = await ApiService.get('http://localhost:8081/test/all');
            const resultBook = res.data.body;
            commit("setResultList", resultBook)
            return resultBook;
        },
        async searchBook ({commit}, param) {
            const res = await ApiService.get(`http://localhost:8081/todo?query=${param}`);
            const searchBook = res.data.documents;
            console.log("search = " + searchBook)
            commit("setSearchList",searchBook);
            return searchBook;
        },
        async saveWishList(request) {
            ApiService.post(`http://localhost:8081/book/wish`, request);
        },

        async filterAllBooks({commit}, param) {
            const res = await ApiService.get(`http://localhost:8081/test/all${param}`);
            const resultBook = res.data.body;
            commit("setResultList", resultBook)
            return resultBook;
        },

        // 로그인 관련 
        async fetchLoginMember({ commit }) {
            const { res } = await ApiService.getWithToken(`http://localhost:8081/me`);
            commit("setLoginMember", res);
            return res;
        },

        async fetchLogOutMember({ commit }) {
            await ApiService.getWithToken(`http://localhost:8081/out`)
            commit("setLogOutMember");
        },

        async fetchReadBook({ commit }) {
            const fetchData = await ApiService.getWithToken("http://localhost:8081/test/readBook");
            commit("setReadBook", fetchData.data);
        },

        async fetchWishBook({ commit }) {
            const fetchData = await ApiService.getWithToken("http://localhost:8081/test/readBook");
            commit("setWishBook", fetchData.data);
        }
    }

})