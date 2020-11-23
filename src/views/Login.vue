<template>
  <div>
    <h1>Login</h1>
    <div>
      <div>{{ error }}</div>
      <input type="text" v-model="user" placeholder="Username" /> <br />
      <input type="password" v-model="pass" placeholder="Password" /><br />
      <button @click="submit">Submit</button>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase";
import auther from "@/plugins/auther";
export default {
  name: "Login",
  data() {
    return {
      user: "",
      pass: "",
      error: ""
    };
  },
  created() {
    auther.requireNonAuth(this.$store.state, this.$router);
    this.$store.commit("changeRequireAuth", false);
  },
  methods: {
    submit() {
      console.log("LOGIN:", this.user, this.pass);
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user, this.pass)
        .then(e => {
          this.error = e.message || "";
        })
        .catch(e => {
          this.error = e;
        });
    }
  }
};
</script>
