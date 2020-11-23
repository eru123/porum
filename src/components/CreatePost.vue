<template>
  <v-card class="container mx-auto bg-gray-700" outlined>
    <h3>Create New Post</h3>
    <input type="text" placeholder="Title" v-model="title" /> <br />
    <textarea
      cols="30"
      rows="10"
      placeholder="Content here"
      v-model="post"
    ></textarea
    ><br />
    <v-btn elevation="0" @click="submit">Post</v-btn>
  </v-card>
</template>
<script>
import firebase from "@/firebase";
export default {
  name: "CreatePost",
  data() {
    return {
      title: "",
      post: "",
    };
  },
  methods: {
    submit() {
      var data = {
        title: this.title,
        content: this.post,
        author: this.$store.state.user.email,
        displayName: this.$store.state.user.displayName,
      };
      console.log(data);
      firebase
        .firestore()
        .collection("posts")
        .doc("sdsfsdf")
        .set(data)
        .then((e) => {
          console.log(e);
        })
        .catch((e) => {
          console.warn(e);
        });
    },
  },
};
</script>
