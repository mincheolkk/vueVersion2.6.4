import Vue from "vue"
import Vuex from "vuex"
import ApiService from "./index";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        resultList: [],
        searchList: [],
        registedList: [],
        kakaoData: "",
        loginMember: null,
        readBook: {},
        wishBookList: [],
        snackbarState: false,
        snackbarText: ""
    },

    getters: {
        getResultList: (state) => {
            return state.resultList;
        },
        getSearchList: (state) => {
            console.log("getSearchlist = " + state);
            return state.searchList;
        },
        getRegistedList: (state) => {
            console.log("state.registedList = " + state.registedList);
            return state.registedList;
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
        fetchedSnackBarState(state) {
            return state.snackbarState;
        },
        fetchedSnackBarText(state) {
            return state.snackbarText;
        }
    },

    mutations: {
        setResultList(state, resultList) {
            state.resultList = resultList;
        },
        setSearchList(state, searchList) {
            console.log("search ++ =" + searchList);
            state.searchList = searchList;
            console.log("state.searchList = " + state.searchList);
        },
        setRegistedList(state, searchRegistedList) {
            state.registedList = searchRegistedList;
            console.log("state.searchRegistedList = " + searchRegistedList);
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
        },
        setSnackbarState(state, snackbarState) {
            state.snackbarState = snackbarState;
        },
        setSnackbarText(state, snackbarText) {
            state.snackbarText = snackbarText;
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
            // 등록된 책 가져오기
            const resSec  = await ApiService.get(`http://localhost:8081/search/readbook?query=${param}`);
            const registeredList = resSec.data;
            commit("setRegistedList", registeredList);
            
            const isbnList = [];
            for (let i = 0; i < registeredList.length; i++) {
                isbnList.push(registeredList[i].isbn);
                console.log("store isbnList = " + isbnList);
            }

            // 책 검색 가져오기
            const res = await ApiService.get(`http://localhost:8081/todo?query=${param}`);
            const searchBook = res.data.documents;
<<<<<<< HEAD
            console.log("search = " + searchBook)
            commit("setSearchList",searchBook);
            return searchBook;
=======

            // 중복 제거
            for (let i=searchBook.length-1; i>=0; i--) {
                if(isbnList.includes(searchBook[i].isbn)){
                    searchBook.splice(i,1);
                }
            }
            commit("setSearchList",searchBook);            
>>>>>>> d4b99f01afc9441336689d98902d8a858296a8a6
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
            const fetchData = await ApiService.getWithToken("http://localhost:8081/test/wish");
            commit("setWishBook", fetchData.data);
        },

        async updateSnackbarState({ commit }, snackbarState) {
            commit("setSnackbarState", snackbarState);
        },

        async updateSnackbarText({ commit }, snackbarText) {
            commit("setSnackbarState", true);
            commit("setSnackbarText", snackbarText);
        }
    }

})