<template>
  <nav>
    <router-link :to="{ name: 'pinia' }">Pinia</router-link> |
    <router-link to="/pinia/api">Pinia API 호출</router-link> |
    <router-link to="/vuex">Vuex</router-link> |
    <router-link to="/vuex/api">Vuex API 호출</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
