<template>
  <v-main app>
    <v-container fluid fill-height>
      <div class="mx-auto" max-width="300px">
        <h1 class="mb-6 text-primary">Create an Account</h1>
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
          <v-text-field
            type="password"
            v-model="cpass"
            label="Confirm Password"
            required
          ></v-text-field>
          <v-btn
            color="primary"
            :loading="loading"
            elevation="0"
            rounded
            @click="submit"
            >Register</v-btn
          >
        </v-card>
        <small>
          Already have an account?
          <router-link to="/login">Login.</router-link>
        </small>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import firebase from "@/firebase";
import auther from "@/plugins/auther";
export default {
  name: "Register",
  data() {
    return {
      loading: false,
      user: "",
      pass: "",
      cpass: "",
      error: "",
    };
  },
  created() {
    auther.requireNonAuth(this.$store.state, this.$router);
    this.$store.commit("changeRequireAuth", false);
  },
  methods: {
    submit() {
      if (this.pass == this.cpass) {
        this.loading = true;
        console.log("LOGIN:", this.user, this.pass);
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.user, this.pass)
          .then((e) => {
            this.error = e.message || "";
          })
          .catch((e) => {
            this.error =
              e.message || "Failed to register account, try again later.";
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.error = "Password doesn't match!";
      }
    },
  },
};
</script>
