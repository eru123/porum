<template>
  <div><h1>Logging out</h1></div>
</template>
<script>
import firebase from "@/firebase";
import auther from "@/plugins/auther";
export default {
  name: "Logout",
  created() {
    auther.requireAuth(this.$store.state, this.$router);
    firebase
      .auth()
      .signOut()
      .finally(() => {
        this.$store.commit("changeAuth", false);
      });
  }
};
</script>
