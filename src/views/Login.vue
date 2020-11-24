<template>
  <v-main app>
    <v-container fluid fill-height>
      <div class="mx-auto" max-width="300px">
        <h1 class="mb-6 text-primary">Porum</h1>
        <v-card outlined class="py-4 px-6 mb-8">
          <v-alert type="error" v-if="error" @click="error = ''">
            {{ error }}
          </v-alert>
          <v-text-field
            type="email"
            v-model="user"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="pass"
            label="Password"
            required
          ></v-text-field>
          <v-btn
            color="primary"
            :loading="loading"
            elevation="0"
            rounded
            @click="submit"
            >Login</v-btn
          >
        </v-card>
        <small>
          Do not have an account?
          <router-link to="/register">Create an Account.</router-link>
        </small>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import firebase from "@/firebase";
import auther from "@/plugins/auther";
export default {
  name: "Login",
  data() {
    return {
      loading: false,
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
      this.loading = true;
      console.log("LOGIN:", this.user, this.pass);
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user, this.pass)
        .then(e => {
          this.error = e.message || "";
        })
        .catch(e => {
          this.error = e;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
