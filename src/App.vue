<template>
  <div id="app">
    <div class="container">

      <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
        <router-link to="/" class="navbar-brand">VUE Project</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link to="/" class="nav-link">List</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/form" class="nav-link">Form</router-link>
            </li>
          </ul>
        </div>
      </nav>

      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
@import './assets/css/bootstrap.min.css';
body{
  font-size: 16px;
  line-height: 1.5;
}
label{
  font-size: 16px;
}
.error{
  color: #dc3545;
}
input.error,
input.error:focus{
  border-color: #dc3545;
  color: #dc3545;
}
.invalid-feedback {
    display: block;
    font-size: 16px;
}
.radio-field .form-check {
    display: flex;
}
.repeater-fields-group {
    border: 1px solid #ededed;
    padding: 10px 35px;
    border-radius: 3px;
}
tbody > div,
tbody span{
  display: contents
}
.handle {
    cursor: move;
}
.sort-by-asc
{
    left: 3px;
    display: inline-block;
    width: 0;
    height: 0;
    border: solid 5px transparent;
    margin: 4px 4px 0 3px;
    background: transparent;
    border-bottom: solid 7px #F80;
    border-top-width: 0;
    margin-left: 0;
}
.shorting {
    float: right;
    width: 30px;
    height: 30px;
    text-align: center;
}
th{
  cursor: pointer;
}
.sort-by-desc
{
    left: 3px;
    display: inline-block;
    width: 0;
    height: 0;
    border: solid 5px transparent;
    margin: 4px 4px 0 3px;
    background: transparent;
    border-top: solid 7px #F80;
    border-bottom-width: 0;
    
}
.table thead th {
    vertical-align: text-bottom;
}
</style>
