import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({ favourite: state.favourite }),
});

Vue.use(Vuex);

// actions
const GET_BREED_LIST = 'getBreedList';
const ADD_BREED_TO_FAVOURITE = 'addBreedToFavourite';
const REMOVE_BREED_FROM_FAVOURITE = 'removeBreedFromFavourite';
const SET_BREED = 'setBreed';

// mutations
const SET_BREED_LIST = 'SET_BREED_LIST';
const SET_FAVOURITE_BREED_LIST = 'SET_FAVOURITE_BREED_LIST';
const SET_BREED_SELECTOR = 'SET_BREED_SELECTOR';

const initState = {
  breedsOptions: [],
  selectedBreed: null,
  favourite: [],
};

const mutations = {
  [SET_BREED_LIST](state, list) {
    state.breedsOptions = list;
  },
  [SET_FAVOURITE_BREED_LIST](state, breedList) {
    state.favourite = [...breedList];
  },
  [SET_BREED_SELECTOR](state, breedName) {
    state.selectedBreed = breedName;
  },
};

const actions = {
  async [GET_BREED_LIST]({ commit }) {
    try {
      const { data } = await axios.get('https://dog.ceo/api/breeds/list/all');
      if (data && data.status && data.status === 'success' && data.message) {
        commit(SET_BREED_LIST, Object.keys(data.message));
      }
    } catch (e) {
      console.error(e);
    }
  },
  [ADD_BREED_TO_FAVOURITE]({ commit, state }, breedItem) {
    commit(SET_FAVOURITE_BREED_LIST, new Set([...state.favourite, breedItem]));
  },
  [REMOVE_BREED_FROM_FAVOURITE]({ commit, state }, breedItem) {
    commit(SET_FAVOURITE_BREED_LIST, state.favourite.filter((a) => (a.value !== breedItem)));
  },
  [SET_BREED]({ commit }, breedName) {
    commit(SET_BREED_SELECTOR, breedName);
  },
};

export default new Vuex.Store({
  strict: true,
  state: initState,
  mutations,
  actions,
  plugins: [vuexLocal.plugin],
});
