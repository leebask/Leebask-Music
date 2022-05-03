const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'LEEBASK_PLAYER'

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd');
const btnplay = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextbtn = $('.btn-next')
const prevbtn = $('.btn-prev')
const randombtn = $('.btn-random')
const repeatbtn = $('.btn-repeat')
const playlist = $('.playlist')


// postAPI = 'https://mp3.zing.vn/xhr/recommend?type=audio&id=ZW67OIA0';
// var as = [12,2]
// fetch(postAPI)
//     .then((reponse) => {
//         return reponse.json();
//     })
//     .then((posts) => {
//         as = posts.data.items;
//         // console.log(as);
//         // return as

//     })

    // setTimeout(() => {
    //     console.log(as);
    // },200)




a = [
    {
        name: 'Hẹn Một Mai',
        singer: 'Bùi Anh Tuấn',
        path: './assets/music/hemmotmai.mp3',
        image: 'https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/273937097_3183154285287917_8135854711004140837_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=QnsnXLaiH7IAX_STULA&_nc_ht=scontent.fsgn5-5.fna&oh=00_AT_Ydx9qUZY0NqMIszPeUaGHKPPpMPl-LaLr-Ez_2VYMJA&oe=6272897D',
    },
    {
        name: 'Đám Cưới Nha?',
        singer: 'Hồng Thanh, DJ Mie',
        path: './assets/music/damcuoinha.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/5/b/8/b/5b8b7cd3d1434afa3b2b9854efdc8756.jpg?fs=MTY0OTE3NzMwNzQ4NXx3ZWJWNHw',
    },
    {
        name: 'Muốn Em Là',
        singer: 'Keyo',
        path: './assets/music/muonemla.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/7/4/0/9/7409e051f6f27cb8e6d241654ebb20d3.jpg?fs=MTY0OTE3NzMwNzQ4NXx3ZWJWNHw',
    },
    {
        name: 'Black Jack',
        singer: 'SOOBIN, Binz',
        path: './assets/music/BlackJack.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/f/1/d/d/f1ddeb86e263f0d67f835f1b60539a34.jpg',
    },
    {
        name: 'Đã Lỡ Yêu Em Nhiều',
        singer: 'JustaTee',
        path: './assets/music/Daloyeuemnhieu.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/covers/d/a/dae7488899bf6ee55f4127cb6a889391_1510557125.jpg?fs=MTY0OTE2NzAxNzg5OHx3ZWJWNHw',
    },
    {
        name: 'Ta Còn Yêu Nhau',
        singer: 'Đức Phúc',
        path: './assets/music/Taconyeu.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/covers/6/1/61c5d7e2d3d6a354861e05836b1d3734_1506652100.jpg?fs=MTY0OTE2NzAxNzg5N3x3ZWJWNHw',
    },
    {
        name: 'Lạc Nhau Có Phải Muôn Đời (Chờ Em Đến Ngày Mai OST)',
        singer: 'Erik',
        path: './assets/music/Lacnhaucophaimuondoi.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/covers/1/c/1c427f21e588bc59ec2be35b65f5c6a5_1484313604.jpg?fs=MTY0OTE2NzAxNzg5N3x3ZWJWNHw',
    },
    {
        name: 'Khi Nào (Hoàn Châu Cách Cách OST)',
        singer: 'Hương Ly',
        path: './assets/music/Khinao.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/4/7/5/1/475127c448df9e29a4ce598edb10e961.jpg?fs=MTY0OTE3NzMwNzQ4NXx3ZWJWNHw',
    },
    {
        name: 'Vui Lắm Nha',
        singer: 'Hương Ly',
        path: './assets/music/Vuilamnha.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/d/2/0/3/d203dca5fe9fbb2190b3b9b729936c53.jpg?fs=MTY0OTE3NzMwNzQ4Nnx3ZWJWNHw',
    },
    {
        name: 'Rồi Nâng Cái Ly',
        singer: 'Nal',
        path: './assets/music/Roinangcaily.mp3',
        image: 'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/8/4/4/7/844758780c2ff39faebaebaf0626a665.jpg?fs=MTY0OTE3NzMwNzQ4N3x3ZWJWNHw',
    }

]

//console.log(a);


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

    songs: a,

    setconfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },

    render: function () {

        const htmls = this.songs.map((song, index) => {
            return `
                            <div  class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                            <div class="thumb" style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                        </div>
                `
        })
        $('.playlist').innerHTML = htmls.join('');

    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvent: function () {
        const _this = this
        const cdWidth = cd.offsetWidth;

        //xử lí quay đĩa cd/ dừng đĩa cd
        const cdThumbAnimation = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000,
            iterations: Infinity
        }
        )
        cdThumbAnimation.pause()


        //phóng to thu nhỏ CD 
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }
        //khi click play 
        btnplay.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();

            }
            //khi bài hát được play xử lí nút
            audio.onplay = function () {
                _this.isPlaying = true
                player.classList.add('playing');
                cdThumbAnimation.play()
            }
            //khi bài hát bị pause xử lí nút
            audio.onpause = function () {
                _this.isPlaying = false
                player.classList.remove('playing');
                cdThumbAnimation.pause()
            }
            //khi tiến độ bài hát thay đổi
            audio.ontimeupdate = function () {
                const progressPecent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPecent
            }
            //xử lí tua bài hát 
            progress.onchange = function (e) {

                const seekTime = audio.duration / 100 * e.target.value
                audio.currentTime = seekTime;
            }
            //khi nhấn next bài hát có random khi có
            nextbtn.onclick = function () {
                if (_this.isRandom) {
                    _this.playRandomSong()
                } else {
                    _this.nextSong()
                }

                audio.play()
                _this.render()
                _this.scrollToActiveSong()
            }
            //khi nhấn prev  bài hát có check random
            prevbtn.onclick = function () {
                if (_this.isRandom) {
                    _this.playRandomSong()
                } else {
                    _this.prevSong()
                }
                audio.play()
                _this.render()
                _this.scrollToActiveSong()
            }
            //nhấn để random bài hát 
            randombtn.onclick = function () {  //bật tắt màu
                _this.isRandom = !_this.isRandom
                _this.setconfig("isRandom", _this.isRandom)
                randombtn.classList.toggle('active', _this.isRandom)

            }
            //xử lí next bài khi bài hát đã hết nếu repeat thì hát lại k thì next và random cũng v
            audio.onended = function () {
                if (_this.isRepeat) {
                    audio.play()
                } else {
                    nextbtn.click();
                }

            }
            //xử lí phát lại bài hat repeat cho đến khi tắt mới hết lặp
            repeatbtn.onclick = function () {
                _this.isRepeat = !_this.isRepeat
                _this.setconfig("isRepeat", _this.isRepeat)
                repeatbtn.classList.toggle('active', _this.isRepeat)
            }
            //lắng nghe khi nhấn vài playlist từng bài
            playlist.onclick = function (e) {
                const songNode = e.target.closest('.song:not(.active')
                if (songNode || e.target.closest('.option')) {
                    //khi click vào song
                    if (songNode) {
                        _this.currentIndex = Number(songNode.dataset.index)
                        _this.loadCurrentSong()
                        _this.render()
                        audio.play()
                    }

                }
                //khi click vào options
            }
        }

    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',

            })
        }, 300)
    }
    ,
    loadCurrentSong: function () {


        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`  //${this.currentSong.image}
        audio.src = this.currentSong.path;


    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat

    },

    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0

        }
        this.loadCurrentSong()

    },
    prevSong: function () {

        if (this.currentIndex == 0) {
            this.currentIndex = this.songs.length

        }
        this.currentIndex--
        this.loadCurrentSong()
    },
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function () {

        //định nghĩa các thuộc tính object
        this.defineProperties();
        //lắng nghe xử lí event
        this.handleEvent();

        //tải thông tin bài đầu khi chạy vào ứng dụng
        this.loadCurrentSong()

        //render playlist
        this.render();
        //hiển thị của random vs repeat khi f5 vẫn có
        randombtn.classList.toggle('active', this.isRandom)
        repeatbtn.classList.toggle('active', this.isRepeat)


    }

}

app.start();


/////////

//         var htmsls = as.map((function(a){
//             return  `
//             <div class="song>
//             <div class="thumb" style="background-image: url('${a.thumbnail}')">
//         </div>
//         <div class="body">
//             <h3 class="title">${a.name}</h3>
//             <p class="author">${a.artists_names}</p>
//         </div>
//         <div class="option">
//             <i class="fas fa-ellipsis-h"></i>
//         </div>
//         </div>
// `
// }))
// // $('.playlist').innerHTML = htmsls.join('');
//         })
//         .catch(function(err){
//             console.log(err,'có lỗi!')
//         })


