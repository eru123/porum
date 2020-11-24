<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgba(44, 62, 80, 0.1);
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
