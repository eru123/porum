<template>
  <div>
    <h1>Register</h1>
    <div>
      <div>{{ error }}</div>
      <input type="text" v-model="user" placeholder="Username" /><br />
      <input type="password" v-model="pass" placeholder="Password" /> <br />
      <input type="password" v-model="cpass" placeholder="Confirm Password" />
      <br />
      <button @click="submit">Submit</button>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase";
import auther from "@/plugins/auther";
export default {
  name: "Register",
  data() {
    return {
      user: "",
      pass: "",
      cpass: "",
      error: ""
    };
  },
  created() {
    auther.requireNonAuth(this.$store.state, this.$router);
    this.$store.commit("changeRequireAuth", false);
  },
  methods: {
    submit() {
      if (this.pass == this.cpass) {
        console.log("LOGIN:", this.user, this.pass);
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.user, this.pass)
          .then(e => {
            this.error = e.message || "";
          })
          .catch(e => {
            this.error =
              e.message || "Failed to register account, try again later.";
          });
      } else {
        this.error = "Password doesn't match!";
      }
    }
  }
};
</script>
