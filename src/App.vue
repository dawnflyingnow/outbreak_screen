<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class App extends Vue {}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
.avue-upload__avatar {
  height: auto !important;
}
/*
.avue-form__group {
  flex-wrap: nowrap !important;
}
.avue-form__row {
  width: auto !important;
}
.avue-form__menu--center {
  padding: 0 !important;
  text-align: left !important;
}
*/
</style>
