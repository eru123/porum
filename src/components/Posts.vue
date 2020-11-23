<template>
  <div style="padding: 1em; border: 1px solid #ccc">
    <h4>Posts</h4>
    <hr />
    <div
      style="padding: 1em; margin: 1em; border: 1px solid #ccc"
      v-for="p in posts"
      :key="p.id"
    >
      <div>{{ p.title }}</div>
      <hr />
      <div>{{ p.content }}</div>
    </div>
  </div>
</template>
<script>
import firebase from "@/firebase";
export default {
  name: "Posts",
  data() {
    return {
      posts: []
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
        .then(e => {
          e.forEach(doc => {
            var data = {
              id: doc.id,
              title: doc.data().title || "No Title",
              content: doc.data().content || "No content"
            };
            this.posts.push(data);
          });
        })
        .finally(() => {
          console.log(this.posts);
        });
    }
  }
};
</script>
