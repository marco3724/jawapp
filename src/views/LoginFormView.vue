<template>

  <div class="form_wrapper">
    <div class="form_container">
      <div class="title_container">
        <h2>Welcome Back!</h2>
      </div>
      <div class="row clearfix">
        <div class="form">
            <div class="input_field">
              <span><i aria-hidden="true" class="fa fa-envelope"></i></span>
              <label for="email" class="hidden">Email</label>
              <input type="email" v-model="email" placeholder="Email*" required />
            </div>
            <div class="input_field">
              <span><i aria-hidden="true" class="fa fa-lock"></i></span>
              <label for="password" class="hidden">Password</label>
              <input
                type="password"
                v-model="password"
                placeholder="Password*"
                required
              />
            </div>
            <div class="row">
              <button type="button"
              class="button"
              :class="{button__loading: is_loading}"
              @click="form_handler">
              <span class="button__text">Login</span>
              </button>
            </div>

        </div>
      </div>
    </div>
    <p class="footer">
      Not registered yet? <router-link to="/register">Sign up</router-link>
    </p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import http from '../http-common'
export default {
  mounted () {
    document.querySelector('.content').className = 'contentF'
  },
  beforeUnmount () {
    document.querySelector('.contentF').className = 'content' // ritorno stato iniziale
  },
  setup () {
  },
  data () {
    return {
      is_loading: false,
      email: '',
      password: ''
    }
  },

  methods: {
    ...mapMutations(['login']),
    form_handler () {
      const ok = true
      if (ok) {
        this.is_loading = true
        const data = {
          email: this.email,
          password: this.password
        }
        console.log(data)
        http.post('auth/login', data)
          .then(res => {
            console.log(res.data)
            this.$toast.success(
              'Welcome back ' + (res.data.username || 'Anonymous') + '!')
            this.is_loading = false
            localStorage.accessToken = res.data.accessToken
            sessionStorage.accessToken = res.data.accessToken
            this.login()
            this.$router.push({ name: 'dashboard' })
          })
          .catch(res => {
            this.$toast.open({
              message: res.response.data.message,
              type: res.response.status === 401 ? 'info' : res.status === 404 ? 'warning' : 'error'
            })
            // console.log(res.response.data)
          })
          .finally(() => { this.is_loading = false })
      } else {
        this.$toast.warning('email or password format not correct!')
      }
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
$blue: black;
$black: #000000;
$grey: #cccccc;

body {
  font-family: 'Roboto', sans-serif;
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
   max-height: 20rem;
  background: #fff;
  width: 390px;
  max-width: 100%;
  border-radius: 15px;
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
    > div {
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
    > span {
      position: absolute;
      left: 0;
      top: 0;
      color: #333;
      height: 100%;
      border-right: 1px solid $grey;
      text-align: center;
      width: 30px;
      > i {
        padding-top: 10px;
      }
    }
  }
  .textarea_field {
    > span {
      > i {
        padding-top: 10px;
      }
    }
  }
  input {
    &[type="text"],
    &[type="email"],
    &[type="password"] {
      width: 100%;
      padding: 8px 10px 9px 35px;
      height: 35px;
      border: 1px solid $grey;
      box-sizing: border-box;
      outline: none;
      -webkit-transition: all 0.3s ease-in-out;
      -moz-transition: all 0.3s ease-in-out;
      -ms-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
    }
    &[type="text"]:hover,
    &[type="email"]:hover,
    &[type="password"]:hover {
      background: #fafafa;
    }
    &[type="text"]:focus,
    &[type="email"]:focus,
    &[type="password"]:focus {
      -webkit-box-shadow: 0 0 2px 1px rgba(255, 169, 0, 0.5);
      -moz-box-shadow: 0 0 2px 1px rgba(255, 169, 0, 0.5);
      box-shadow: 0 0 2px 1px rgba(255, 169, 0, 0.5);
      border: 1px solid $blue;
      background: #fafafa;
    }
  }
}
.button {

      background: $blue;
      left: 15%;
      padding: 8px 16px;
      height: 45px;
      width: 70%;
      border: none;
      outline: none;
       border-radius: 5px;
      cursor: pointer;
      color: #fff;
      font-size: 1.1em;
      position: relative;
      -webkit-transition: all 0.3s ease-in-out;
      -moz-transition: all 0.3s ease-in-out;
      -ms-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
      &:hover {
        background: darken($blue, 7%);
      }
      &:focus {
        background: darken($blue, 7%);
      }
      &:active {
        background: darken($blue, 40%);
      }
    }
.button__text {
    font: bold 14px Verdana, Geneva, sans-serif;
    color:#fff;
    transition: all 0.2s;
}
.button__loading .button__text{
    visibility: hidden;
    opacity: 0;
}
.button__loading::after{
    content: "";
    position:absolute;
    width: 1.75rem;
    height: 1.75rem;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border: 4px solid transparent;
    border-top-color: #fff;
    border-radius: 50%;
    animation: button-loading-spinner 1.5s ease infinite;
}

@keyframes button-loading-spinner {
    from {
        transform: rotate(0.25turn);
    }

    to {
        transform: rotate(2.25turn);
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
    color: darken($blue, 7%);
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
    margin-top: 5em;
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

.toast {
  z-index: 2;
  position: fixed;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}
.toast-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.toast-enter-active {
  transition: all 0.3s ease;
}
.toast-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.toast-leave-active {
  transition: all 0.3s ease;
  }
</style>
