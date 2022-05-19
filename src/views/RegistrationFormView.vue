<template>

<div class="form_wrapper">
  <div class="form_container">
    <div class="title_container">
      <h2>jawapp Registration Form</h2>
    </div>
    <div class="row clearfix">
      <div class="">
        <form>
          <div class="input_field"> <span><i aria-hidden="true" class="fa fa-user"></i></span>
            <label for="username" class="hidden">Username</label>
                <input type="text" name="username" placeholder="Username*" required/>
          </div>
          <div class="input_field"> <span><i aria-hidden="true" class="fa fa-envelope"></i></span>
            <label for="email" class="hidden">Email</label>
            <input type="email" name="email" placeholder="Email*" required />
          </div>
          <div class="input_field"> <span><i aria-hidden="true" class="fa fa-lock"></i></span>
            <label for="password" class="hidden">Password</label>
            <input type="password" name="password" placeholder="Password*" required />
          </div>
          <div class="input_field"> <span><i aria-hidden="true" class="fa fa-lock"></i></span>
            <label for="conf-password" class="hidden">Confirm Password</label>
            <input type="password" name="conf-password" placeholder="Confirm Password*" required />
          </div>
          <div class="input_field"> <span><i aria-hidden="true" class="fa fa-globe"></i></span>
            <label for="fav-city" class="hidden">Default City</label>
                <input type="text" name="fav-city" placeholder="Default City [Rome, Italy]" />
          </div>
          <div class="row mandatory">
            <p>(*) fields are mandatory!</p>
          </div>
          <input class="button" type="submit" value="Register" @click="form_handler"/>
        </form>
      </div>
    </div>
  </div>
</div>
<p class="footer">Already Registered? <a href="#" target="_blank">Login</a></p>
</template>

<script>
export default {
  data () {
    return {
      value: 12
    }
  },
  methods: {
    form_handler (event) {
      console.log(event)
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
$blue:#2a5fb4;
$black:#000000;
$grey:#cccccc;

body {
    font-family: Verdana, Geneva, sans-serif;
    font-size: 14px;
    background: #f2f2f2;
}
.clearfix {
    &:after {
        content: "";
        display: block;
        clear: both;
        visibility: hidden;
        height: 0;
    }
}
.form_wrapper {
    background: #fff;
    width: 400px;
    max-width: 100%;
    box-sizing: border-box;
    padding: 25px;
    margin: 8% auto 0;
    position: relative;
    z-index: 1;
    border-top: 5px solid $blue;
    -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
   opacity: 1;
    h2 {
        font-size: 1.5em;
        line-height: 1.5em;
        margin: 0;
    }
    .title_container {
        text-align: center;
        padding-bottom: 15px;
    }
    h3 {
        font-size: 1.1em;
        font-weight: normal;
        line-height: 1.5em;
        margin: 0;
    }
    label {
        font-size: 12px;
    }
    .row {
        margin: 10px -15px;
        >div {
            padding: 0 15px;
            box-sizing: border-box;
        }
    }
    .col_half {
        width: 50%;
        float: left;
    }
    .input_field {
        position: relative;
        margin-bottom: 20px;
        >span {
            position: absolute;
            left: 0;
            top: 0;
            color: #333;
            height: 100%;
            border-right: 1px solid $grey;
            text-align: center;
            width: 30px;
            >i {
                padding-top: 10px;
            }
        }
    }
    .textarea_field {
        >span {
            >i {
                padding-top: 10px;
            }
        }
    }
    input {
    &[type="text"], &[type="email"], &[type="password"] {
      width: 100%;
      padding: 8px 10px 9px 35px;
      height: 35px;
      border: 1px solid $grey;
      box-sizing: border-box;
      outline: none;
      -webkit-transition: all 0.30s ease-in-out;
      -moz-transition: all 0.30s ease-in-out;
      -ms-transition: all 0.30s ease-in-out;
      transition: all 0.30s ease-in-out;
    }
    &[type="text"]:hover, &[type="email"]:hover, &[type="password"]:hover {
      background: #fafafa;
    }
    &[type="text"]:focus, &[type="email"]:focus, &[type="password"]:focus {
      -webkit-box-shadow: 0 0 2px 1px rgba(255, 169, 0, 0.5);
      -moz-box-shadow: 0 0 2px 1px rgba(255, 169, 0, 0.5);
      box-shadow: 0 0 2px 1px rgba(255, 169, 0, 0.5);
      border: 1px solid $blue;
      background: #fafafa;
    }
    &[type="submit"] {
        background: $blue;
        height: 35px;
        line-height: 35px;
        width: 100%;
        border: none;
        outline: none;
        cursor: pointer;
        color: #fff;
        font-size: 1.1em;
        margin-bottom: 10px;
        -webkit-transition: all 0.30s ease-in-out;
        -moz-transition: all 0.30s ease-in-out;
        -ms-transition: all 0.30s ease-in-out;
        transition: all 0.30s ease-in-out;
        &:hover {
            background: darken($blue,7%);
        }
        &:focus {
            background: darken($blue,7%);
        }
    }
  }
}
.form_container {
    .row {
        .col_half.last {
            border-left: 1px solid $grey;
        }
    }
}
.footer {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 15px;
    color: $blue;
    a {
        color: darken($blue,7%);
    }
}
.mandatory {
  position: relative;
    z-index: 1;
  overflow: hidden;
  padding-left: 1rem;
}

.hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

@media (max-width: 600px) {
    .form_wrapper {
        .col_half {
            width: 100%;
            float: none;
        }
    }
    .bottom_row {
        .col_half {
            width: 50%;
            float: left;
        }
    }
    .form_container {
        .row {
            .col_half.last {
                border-left: none;
            }
        }
    }
}
</style>
