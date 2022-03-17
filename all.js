const corsURL = "https://escape-cors-anywhere.herokuapp.com/"; // use cors-anywhere to fetch api data

const apiUrl = "https://hex-escape-room.herokuapp.com";
const apiPath = "/api/cors/news";



const app = Vue.createApp({
    data() {
        return {
            news: [],
            tempNews: {},
            isShow: false
        };
    },
    methods: {
        getNews() {
            const url = `${apiUrl}${apiPath}`;
            axios
                .get(url)
                .then((res) => {
                    this.news = res.data.data;
                    this.news.forEach((item) => {
                        let timezone = moment(item.publishedAt).locale('zh-tw').format('L ah:mm:ss');
                        item.publishedAt = timezone;
                    });
                })
                .catch((err) => {
                    console.dir(err);
                });
        },
        getItem(id) {
            const url = `${corsURL}${apiUrl}${apiPath}/${id}`;
            axios
                .get(url)
                .then((res) => {
                    this.tempNews = res.data.data;
                    let timezone = moment(this.tempNews.publishedAt).locale('zh-tw').format('L ah:mm:ss');
                    this.tempNews.publishedAt = timezone;
                    this.isShow = true;
                    // console.log(res);
                })
                .catch((err) => {
                    console.dir(err);
                });
        }
    },
    mounted() {
        this.getNews();
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }
});

app.mount("#app");
