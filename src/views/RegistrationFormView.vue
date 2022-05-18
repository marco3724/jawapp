<template>
<form action="" method="post" name="eseform" enctype="multipart/form-data">
<div class="container">
        <div class="registration">
            <div class="h1">
                <br>
                <hr><b>Register</b><hr>
                <br>
                <b>Create your account.It's free and it takes only few minutes.</b>
            </div>
            <div class="content">
                <div class="container-name">
                        <b>Name:</b>
                        <input type="text" placeholder="Insert Name." name="name" size="30"  maxlength="10" required><br><br>
                </div>

                <div class="container-surname">
                    <b>Surname:</b>
                    <input type="text" placeholder="Insert Surname." name="surname" size="30" maxlength="20"  required><br><br>
                </div>

                <div class="container-email">
                        <b>Email:</b>
                        <input type="text" placeholder="Insert Email." name="email" size="30"  maxlength="30" required><br><br>
                </div>

                <div class="container-birth">
                    <b>Date of birth:</b>
                    <input type="date" name="birthdate" id="birthdate"  required><br><br>
                </div>

                <div class="container-password">
                    <b>Password:</b>
                    <input type="password" placeholder="Insert password." name="password" id="password" required><br><br>
                </div>

                <div class="container-repeatpassword">
                    <b>Repeat Password:</b>
                    <input type="password" placeholder="Repeat password." name="password-repeat" id="password-repeat" required><br><br>
                </div>

                <button type="submit" class="registerbtn" color: white >Submit.</button><br>
                <hr>
            </div>
        <div class="container-signin">
                    <p>Already have an account? <a href="/">Sign in</a></p>
                </div>
                <div class="side-bar">
                </div>
            </div>
</div>
</form>
</template>

<script>
export default {
  data () {
    return {
      value: 12
    }
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.registration{
    display: grid;
    grid-template:
            'c . .'
            'c a .'
            'c b .'
            'c b .'
            'c d .' /1fr 5fr 1fr;
    text-align: center;
    background-color: lightsteelblue;
}

.registration > div {
    padding:1em 1em;
    font-size: 2em;
}

.h1 {grid-area:a;}
.content{grid-area:b;}
.side-bar{grid-area:c;}
.container-signin{grid-area:d;}

.content{
    background-color:white;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.registerbtn{
    background-color: white;
    font-size: 1em;
    border-radius: 16px;
}

.registerbtn:hover {
  background-color: whitesmoke;
  color: black;
    cursor: pointer;
}

.h1{
        background-color:white;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        font-weight: bolder;
}

input[type=text]
{
    padding:16px 16px;
    text-align:center;
    font-size: 15px;
}

input[type=password]
{
    padding:16px 16px;
    text-align:center;
    font-size: 15px;
}

input[type=date]{
    font-size: 25px;
}
</style>
