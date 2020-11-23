<template>
  <div class="container mx-auto bg-gray-700">
    <h3>Create New Post</h3>
    <input type="text" placeholder="Title" v-model="title" /> <br />
    <textarea cols="30" rows="10" v-model="post"></textarea><br />
    <button @click="submit">Post</button>
  </div>
</template>
<script>
import firebase from "@/firebase";
export default {
  name: "CreatePost",
  data() {
    return {
      title: "",
      post: ""
    };
  },
  methods: {
    submit() {
      var data = {
        title: this.title,
        content: this.post,
        author:
          this.$store.state.user.displayName || this.$store.state.user.email
      };
      console.log(data);
      firebase
        .firestore()
        .collection("posts")
        .doc("testDocID-2343")
        .set(data)
        .then(e => {
          console.log(e);
        })
        .catch(e => {
          console.warn(e);
        });
    }
  }
};
</script>
