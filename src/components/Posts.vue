<template>
  <div>
    <h4>Posts</h4>
    <v-card
      class="mx-auto my-4"
      v-for="p in posts"
      :key="p.id"
      align="left"
      outlined
    >
      <v-card-title>{{ p.title }}</v-card-title>
      <v-card-subtitle>{{ p.author }}</v-card-subtitle>
      <v-card-text>{{ p.content }}</v-card-text>
    </v-card>
  </div>
</template>
<script>
import firebase from "@/firebase";
export default {
  name: "Posts",
  data() {
    return {
      posts: [],
    };
  },
  created() {
    this.retrieve();
  },
  methods: {
    retrieve() {
      firebase
        .firestore()
        .collection("posts")
        .get()
        .then((e) => {
          e.forEach((doc) => {
            var data = {
              id: doc.id,
              title: doc.data().title || "No Title",
              author: doc.data().displayName || doc.data().author || "Pepe",
              content: doc.data().content || "No content",
            };
            this.posts.push(data);
          });
        })
        .finally(() => {
          console.log(this.posts);
        });
    },
  },
};
</script>
