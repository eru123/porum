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
      <v-card-text
        >{{ p.content }}
        <v-img :src="p.avatar"></v-img>
      </v-card-text>
    </v-card>
    <div v-if="loading">
      <v-skeleton-loader
        class="my-4"
        type="article, actions"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="my-4"
        type="article, actions"
      ></v-skeleton-loader>
    </div>
  </div>
</template>
<script>
import firebase from "@/firebase";
import gravatar from "@/plugins/gravatar";
export default {
  name: "Posts",
  data() {
    return {
      loading: false,
      posts: []
    };
  },
  created() {
    this.retrieve();
  },
  methods: {
    retrieve() {
      this.loading = true;
      firebase
        .firestore()
        .collection("posts")
        .get()
        .then(e => {
          e.forEach(doc => {
            var data = {
              id: doc.id,
              title: doc.data().title || "No Title",
              author: doc.data().displayName || doc.data().author || "Pepe",
              content: doc.data().content || "No content",
              avatar: gravatar(doc.data().author)
            };
            this.posts.push(data);
          });
        })
        .finally(() => {
          console.log(this.posts);
          this.loading = false;
        });
    }
  }
};
</script>
