import { mapState } from 'vuex';
import debounce from 'lodash.debounce';
import axios from 'axios';
import Grid from '@/components/Grid.vue';

const mapBreedList = (list, favourites) => list.map((a) => ({
  value: a,
  isFavourite: !!favourites.find((favItem) => (favItem.value === a)),
}));

export default {
  components: {
    Grid,
  },
  data() {
    return {
      breeds: [],
      loading: false,
      requestErrorMessage: '',
    };
  },
  mounted() {
    window.addEventListener('scroll', this.debouncedHandler);
    this.loading = true;
    this.fetchDogsGrid()
      .then((res) => {
        this.breeds = mapBreedList(res, this.favourite);
      })
      .catch((err) => {
        console.log(err);
        this.requestErrorMessage = err.message;
      })
      .finally(() => {
        this.loading = false;
      });
  },
  destroyed() {
    window.removeEventListener('scroll', this.debouncedHandler);
  },
  computed: {
    ...mapState(['selectedBreed', 'favourite']),
    debouncedHandler() {
      return debounce(this.handleScroll, 300);
    },
  },
  watch: {
    selectedBreed(newBreedName) {
      this.loading = true;
      this.fetchDogsGrid(newBreedName)
        .then((res) => {
          this.breeds = mapBreedList(res, this.favourite);
        })
        .catch((err) => {
          console.log(err);
          this.requestErrorMessage = err.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  methods: {
    fetchDogsGrid(breedName) {
      return new Promise((resolve, reject) => {
        const BASE_URL = 'https://dog.ceo/api';

        const query = this.$route.name === 'Breed' && breedName
          ? `${BASE_URL}/breed/${breedName}/images/random/20`
          : `${BASE_URL}/breeds/image/random/20`;

        axios.get(query)
          .then(({ data }) => {
            if (data && data.status && data.status === 'success' && data.message) {
              resolve(data.message);
            } else {
              reject(new Error('fetch data error'));
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    handleScroll() {
      const isBottom = document.documentElement.scrollTop + window.innerHeight
        === document.documentElement.offsetHeight;
      if (isBottom) {
        this.fetchDogsGrid()
          .then((res) => {
            this.breeds = this.breeds.concat(mapBreedList(res, this.favourite));
          })
          .catch((err) => {
            console.log(err);
            this.requestErrorMessage = err.message;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    selectItem(item) {
      this.breeds = this.breeds.map((a) => (a.value === item.value ? item : a));
    },
  },
};
