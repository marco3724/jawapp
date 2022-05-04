app.component('content',{
    template:
    /*html*/
    `<div class="abs-lft"><i class="fa-solid fa-bars"></i></div>
     <div class="current">
        <div class="header">
            
            <div class="center">
                <form class="search-bar" @submit.prevent="searchByCity">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Search city..." v-model="city" >
                </form>
            </div>  
        </div>
        <div class="main">
            <div class="main-info">

                <div class="location">
                    <span class="city"><i class="fa-solid fa-location-dot"></i> {{fullCity}}</span>
                    <span class="date">{{date(null)}}</span>
                </div>
                
                <div class="temperature">
                    <div class="center">
                        <div class="number">{{formatTemperature(current.temp)}}</div>
                        <div class="description">{{current.weather[0].description}}</div>
                    </div>
                </div>
                <div class="other">
                    <span class="el"><img src="https://img.icons8.com/ios/15/000000/sunrise--v1.png"/> {{formatTime(current.sunrise)}}</span>
                    <span class="el"><i class="fa-solid fa-temperature-half"></i> {{formatTemperature(current.feels_like)}}</span>
                    <span class="el"><img src="https://img.icons8.com/ios/15/000000/sunset--v1.png"/> {{formatTime(current.sunset)}}</span>
                </div>
            </div>
            <div class="chart">
            </div>
        </div>
        <div class="other-info">
            <div class="info">
                <div class="text-info">
                    <div class="name">Wind speed</div>
                    <div class="about">today Wind speed</div>
                    <div class="value">{{current.wind_speed}} m/s</div>
                </div>
                <div class="chart">

                </div>
            </div>

            <div class="info">
                <div class="text-info">
                    <div class="name">Humidity</div>
                    <div class="about">today Humidity</div>
                    <div class="value">{{current.humidity}}%</div>
                </div>
                <div class="chart">

                </div>
            </div>

            <div class="info">
                <div class="text-info">
                    <div class="name">Pressure</div>
                    <div class="about">today Pressure</div>
                    <div class="value">{{current.pressure}}hpa</div>
                </div>
                <div class="chart">

                </div>
            </div>

            <div class="info">
                <div class="text-info">
                    <div class="name">UVI index</div>
                    <div class="about">Today UV index</div>
                    <div class="value">{{current.uvi}}</div>
                </div>
                <div class="chart">
                    
                </div>
            </div>
        </div>
    </div>
    <div class="forecast">
        <div class="title">
            Forecast
        </div>
        <div class="hourly">
            <div class="text">today</div>
            <div class="hour-container" >
                <div class="hour" v-for="hour in hourly">
                    <div class="time">{{formatTime(hour.dt)}}</div>
                    <div class="icon"><img :src="findIcons(hour.weather[0].icon)"/></div>
                    <div class="temp">{{formatTemperature(hour.temp)}}</div>
                </div>
               
            </div>
        </div>
        <div class="text week">weekly</div>
        <div class="daily" >
        
            <div class="day" v-for="day in daily">
                <div class="container" >
                    <div class="text">{{week(day.dt)}}</div>
                    <div class="date">{{date(day.dt)}}</div>
                </div>
                <div class='end'>
                    <div class="temp">{{formatTemperature(day.temp.day)}}</div>
                    <div class="icon"><img :src="findIcons(day.weather[0].icon)"></div>
                </div>
            </div> 
        </div>
    </div>`,
    data(){
        return{
            location:{},
            city:'',
            current:{
                sunset:0,
                sunrise:0,
                weather:[{}]
            },
            hourly: [],
            daily:[]

        }
    },
    methods:{
        async searchByCity(){
            const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=1&appid=${key}`)
            const loc = await res.json()
            this.location = loc[0]
            console.log(loc)
            const res1 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${loc[0].lat}&lon=${loc[0].lon}&exclude={alerts,minutely}&units=metric&appid=${key}`)
            const data = await res1.json()
            this.cityName = this.city
            this.current = data.current
            for (let i = 0;i<10;i++){
                this.hourly.push(data.hourly[i])
            }
            for (let i = 1;i<8;i++){
                this.daily.push(data.daily[i])
            }
            console.log(data)

        },
        formatTime(time){
            var date = new Date(time * 1000);
            var hours = date.getHours();
            var min = date.getMinutes();
            var minutes = min < 10 ? '0'+ min :min  ; /*solo per formattazione*/
            return hours + ':' + minutes

        },
        formatTemperature(temp){
            return parseInt(temp) +'°'
        },
        findIcons(icon){
            return `https://openweathermap.org/img/wn/${icon}.png`
        },
        week(time){
            const days = ["Sunday","Monday","Tuesday","Wednesday", "Thursday", "Friday", "Saturday"]
            var date = new Date(time * 1000);
            return days[date.getDate()%7]
        },
        date(time){
            if(time!=null)
                var date = new Date(time*1000).toString().split(' ')
            else 
                var date = new Date().toString().split(' ')
            return date[2]+' '+ date[1]
        }
        
    },
    computed:{
        fullCity(){
            return this.location.name+','+this.location.country
        }
    }
})