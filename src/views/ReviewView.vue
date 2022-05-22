<template>
<div class="container">
  <div class="overview">
    <div class="title">Customer Review</div>
    <div class="media">
        <div class="number">{{media}}</div>
        <div class='stars'>
            <div class="vote" v-for="index in 5" :key="index">
              <div v-if="media>=index"><i class="fa-solid fa-star"></i></div>
              <div v-else-if="media>=index-0.5"><i class="fa-solid fa-star-half-stroke"></i></div>
              <div v-else> <i class="fa-regular fa-star"></i></div>
            </div>
        </div>
        <div class="total">{{tot}} review</div>
    </div>
    <div class="votes">
        <div class="bars">
          <div class="bar" v-for="bar in percentage" :key="bar" :style="{'--perc1': percentage[4].p, '--perc2':percentage[3].p,'--perc3': percentage[2].p,'--perc4': percentage[1].p,'--perc5': percentage[0].p}">
            <div class="left">
            <label>{{bar.i}} </label>
            <div class="percentage-bar" :id="id(bar.i)"></div>
            </div>
            <div class="value-container">
              <div class="perce">{{bar.p}}</div>
              <div class="perce-number">{{bar.n}}</div>
            </div>
          </div>
        </div>
    </div>
  </div>
  <div class="form">
    <form >
      <label for="cars">rate the website:</label>
      <select id="stars" name="stars">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="4">5</option>
      </select>
      <textarea name="comment" />
      <input type="submit" value="send">
    </form>
  </div>
</div>
<div class="reviews" >
  <div class="review" v-for="rev in reviews" :key="rev" >
    <div class="star">
      <div class="vote" v-for="index in 5" :key="index" >
        <div v-if="rev.star>=index"><i class="fa-solid fa-star"></i></div>
        <div v-else> <i class="fa-regular fa-star"></i></div>
      </div>
    </div>
    <div class="comment">{{rev.comment}}</div>
  </div>
</div>
</template>

<script>

export default {
  data () {
    return {
      reviews: [
        {
          star: 1,
          comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
          star: 2,
          comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
          star: 4,
          comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
          star: 4,
          comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
          star: 3,
          comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
          star: 5,
          comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        }, {
          star: 5,
          comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        }, {
          star: 5,
          comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        }, {
          star: 5,
          comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        }, {
          star: 5,
          comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        }, {
          star: 3,
          comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
          star: 3,
          comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        }

      ]
    }
  },
  methods: {
    id (i) {
      return 'bar' + i
    }
  },
  mounted () {

  },
  computed: {
    media () {
      let m = 0
      this.reviews.forEach(el => {
        m += el.star
      })
      return (m / this.reviews.length).toFixed(1)
    },
    tot () {
      return this.reviews.length
    },
    percentage () {
      const n = [0, 0, 0, 0, 0]
      const obj = []
      this.reviews.forEach(rev => {
        n[rev.star - 1]++
      })
      for (let i = 4; i >= 0; i--) {
        obj.push({
          i: i + 1,
          n: n[i],
          p: (n[i] / this.reviews.length * 100).toFixed(1) + '%'
        })
      }
      return obj
    }

  }
}
</script>

<style scoped>
.container{
  padding: 1em;
  box-sizing: border-box;
  height: 100vh;
  display: grid;
  grid-auto-rows: 1fr 1fr;
  gap: 2em;
}
.overview{
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
border-radius: 5px;
padding: 2em;
display: flex;
flex-direction: column;
gap: 1em;

}
.title{
  font-weight: bold;
  font-size: 1.2em;
}
.media{
  display: flex;
  gap: 0.5em;
}
.number{
 font-weight: bold;
 font-size: 2em;
}
.stars{
  align-self:center;
  display: flex;
}
.total{
  align-self:center;
  color:#9FA7B4;
}
.bars{
  display: flex;
  flex-direction: column;
  gap: 1em;
}
label{
  align-self: center;
  font-weight: bold;
}
.bar{
  display: grid;
  gap: 0.5em;
  grid-template-columns: 2fr 0.2fr;
}
.left{
  display: flex;
  gap: 0.5em;
}
.value-container{
  display: flex;
  justify-content: space-between;
  gap:0.5em;
}
.percentage-bar{
position: relative;
background-color:#E1EDFE ;
height: 1.5em;
width: 100%;
border-radius: 5px;
}
.percentage-bar::after{
border-radius: 5px;
position: absolute;
content: '';
height: 100%;
}
.perce{
  font-weight: bold;
}
.perce-number{
  color:#9FA7B4;
}
#bar5::after{
  background:linear-gradient(#02aab0, #00cdac);
  width: var(--perc5);
}
#bar4::after{
  background:linear-gradient(#56ab2f , #a8e063);
  width:var(--perc4);
}
#bar3::after{
background-image: linear-gradient(315deg, #fbb034 0%, #ffdd00 74%);;
width: var(--perc3);
}
#bar2::after{
  background:linear-gradient(#ff9966 , #ff5e62);
  width: var(--perc2);
}
#bar1::after{
  background:linear-gradient(#ff512f , #dd2476);
  width: var(--perc1);
}
.form{
  display:grid;
}
form{
  display:grid;
  grid-template-rows:1fr 1fr 5fr 2fr;
  gap: 1em;
}
textarea{
  resize: none;
}
input[type="submit"]{
  background: black;
  color: white;
  border: none;
  border-radius:10px ;

  width:30%;
  transition: background 500ms;
}
input[type="submit"]:hover{
cursor: pointer;
border: 2px solid black;
background: none;
color: black;

}
.star{
  display: flex;
  flex-direction: row;
}
.reviews{
height: 100vh;
overflow: scroll;
}
.review{
margin: 1em;
padding: 1em;
border-radius: 10px;
background: #bdc3c7;
}
@media (max-width:1024px){
    .overview{
      margin-top: 2em;
    }
}
@media (max-width:800px){
    .reviews{
      overflow:visible;
    }
}

</style>
