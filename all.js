const corsURL = "https://escape-cors-anywhere.herokuapp.com/"; // use cors-anywhere to fetch api data

const apiUrl = "https://hex-escape-room.herokuapp.com";
const apiPath = "/api/cors/news";



const app = Vue.createApp({
    data() {
        return {
            news: [],
            tempNews: {
                author: "自由時報",
                title: "台鐵公司化 學者：提升效率、向心力 - 自由時報電子報",
                description:
                    "台鐵公司化喊了廿二年，即將啟動。學者表示，公司化後可提升效率、活絡軌道經濟等，並分析安全問題很大一部分源於人力不足、人力斷層導致經驗無法傳承，可透過公司化過程吸引專業人才。台大土木系教授、台大先進公共運輸研究中心主任張學孔指出，台鐵公司化已談了廿年，一定要好好把握這個時機。公司化優點包括政企分離提升效率、活絡軌道經濟，更能賞罰分明提升員工向心力。",
                url: "https://news.ltn.com.tw/news/life/paper/1500586",
                urlToImage: "https://img.ltn.com.tw/Upload/news/600/2022/02/15/94.jpg",
                publishedAt: "2022-02-14T21:30:00Z",
                content: null
            },
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
            const url = `${corsURL}${apiUrl}${apiPath}/:${id}`;
            axios
                .get(url)
                .then((res) => {
                    this.tempNews = res.data;
                    let timezone = moment(tempNews.publishedAt).locale('zh-tw').format('L ah:mm:ss');
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
