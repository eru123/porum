<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/logout">Logout</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import firebase from "@/firebase";
export default {
  name: "App",
  created() {
    this.$on("change-auth", function(value) {
      this.$store.commit("changeAuth", value);
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.commit("changeAuth", true);
        this.$store.commit("changeUser", user);
        console.log("signed in");
        console.log(user);
        if (this.$store.state.requireAuth === false) {
          this.$router.push("/");
        }
      } else {
        this.$store.commit("changeAuth", false);
        this.$store.commit("changeUser", {});
        console.log("signed out");
        if (this.$store.state.requireAuth === true) {
          this.$router.push("/login");
        }
      }
    });
  }
};
</script>
