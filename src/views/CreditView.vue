
<template>
<div class='container'>
    <div class="wrap">
        <div class="title">
            JAWApp Team
        </div>
        <div class="body">
            <div class="images">
                <div class="user">
                    <div class="img">
                        <img src="../../public/img/memoji/daniele.jpg" alt="memoji"/>
                        <div class="contact" >
                            <a href="mailto:caldarini.1917265@stundenti.uniroma1.it">
                            <div class="text">
                                contact me
                            </div>
                            </a>
                        </div>
                    </div>
                    <div class="info">
                        <p>Nome: Daniele</p>
                        <p>Matricola: 1917265</p>
                    </div>
                </div>
                <div class="user">
                    <div class="img">
                        <img src="../../public/img/memoji/marco.jpg" alt="memoji"/>
                        <div class="contact">
                            <a href="mailto:wang.1919137@stundenti.uniroma1.it">
                            <div class="text">
                                contact me
                            </div>
                            </a>
                        </div>
                    </div>
                    <div class="info">
                        <p>Nome: Marco</p>
                        <p>Matricola: 1919137</p>
                    </div>
                </div>
                <div class="user">
                    <div class="img">
                        <img src="../../public/img/memoji/sasha.jpg" alt="memoji"/>
                        <div class="contact">
                            <a href="mailto:soludchyk.1895504@stundenti.uniroma1.it">
                            <div class="text">
                                contact me
                            </div>
                            </a>
                        </div>
                    </div>
                    <div class="info">
                        <p>Nome: Sasha</p>
                        <p>Matricola: 1895504</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="description">
            Questo sito e' stato realizzato per il progetto di Linguaggi e Tecnologie per il web 2021/22, da 2 studenti di Ingegneria Informatica ed uno di Informatica
        </div>
    </div>
</div>
</template>

<script>
/* eslint-disable no-undef */

export default {
  mounted () {
    document.querySelector('.content').className = 'contentF'
  },
  beforeUnmount () {
    document.querySelector('.contentF').className = 'content' // ritorno stato iniziale
  }
}
</script>

<style scoped>
.container{
    display: flex;
    align-items: center;
    justify-content: center;
   padding: 3em;

}
.wrap{
    display: flex;
    flex-direction: column;
    gap: 4em;
}
.title{
    font-size: 2em;
    font-weight: bold;
    text-align: center;
}
.contact{
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color:rgba(0,0,0, 0);
    border-radius: 50%;

    transition: background-color 800ms;
    display: flex;
    align-items: center;
    justify-content: center;
}

.contact:hover{
    background-color:rgba(83, 92, 104, 0.7);
    cursor: pointer;

}
a{
    font-style: none;
    text-decoration: none;
}
.contact:hover .text{
    color: rgba(255,255, 255, 1);
    font-weight:500;

}
.text{
    color: rgba(255,255, 255, 0);
    font-size: 1.5em;

}
.img{
    width: 250px;
    height: 250px;
    position: relative;
    margin-bottom: 1em;

}
img{
    width: 100%;
    height: 100%;
     border-radius: 50%;
}
.images{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 2em;
}
.description{
    text-align: center;
    font-weight: 500;
}
.info{
    color: #9FA7B4;
    text-align: center;
}
</style>
