<template>
  <div class="my-4">
    <v-card outlined v-if="!editing">
      <v-card-title>Hello there {{ userEmail }},</v-card-title>
      <v-card-text
        >Get help from others? or you just wanna clear some confusion on your
        mind now? ask here now!</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          @click="editing = true"
          elevation="0"
          rounded
          class="px-6"
        >
          Ask a Question
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card outlined v-if="editing">
      <v-card-title>Ask a question</v-card-title>
      <v-card-text>
        <v-alert type="error" v-if="error.length > 0">{{ error }}</v-alert>
        <v-text-field
          label="Question Title"
          outlined
          dense
          required
          :counter="36"
          :disabled="loading"
          :rules="titleRules"
          v-model="title"
        ></v-text-field>
        <v-text-field
          label="Short Description"
          outlined
          dense
          v-model="short_description"
          :counter="100"
          :rules="shortDescriptionRules"
          :disabled="loading"
          required
        ></v-text-field>
        <v-textarea
          outlined
          dense
          name="input-7-4"
          label="Describe the question"
          v-model="content"
          :rules="contentRules"
          :counter="8000"
          :disabled="loading"
          required
        ></v-textarea>
        <div class="text-right">
          <v-btn
            elevation="0"
            class="mr-6"
            :disabled="loading"
            @click="clearForm"
            icon
          >
            <v-icon color="warning">mdi-cancel</v-icon>
          </v-btn>
          <v-btn
            elevation="0"
            class="mr-6"
            :disabled="loading"
            @click="discardChanges"
            icon
          >
            <v-icon color="error">mdi-delete</v-icon>
          </v-btn>
          <v-btn
            elevation="0"
            color="primary"
            @click="preSubmit"
            :loading="loading"
            rounded
            >Post</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import firebase from "@/firebase";
export default {
  name: "CreatePost",
  data() {
    return {
      error: "",
      loading: false,
      editing: false,
      title: "",
      content: "",
      short_description: "",
      titleRules: [
        v => !!v || "Give me a valid title",
        v =>
          (typeof v == "string" ? v.length : 0) >= 3 ||
          "Title must be atleast 3 char.",
        v =>
          (typeof v == "string" ? v.length : 0) <= 36 ||
          "Title must be 36 or less char."
      ],
      shortDescriptionRules: [
        v => !!v || "Please add a short description",
        v =>
          (typeof v == "string" ? v.length : 0) >= 24 ||
          "Short description must be atleast 24 char.",
        v =>
          (typeof v == "string" ? v.length : 0) <= 100 ||
          "Short description must be 100 or less char."
      ],
      contentRules: [
        v => !!v || "Please add a description",
        v =>
          (typeof v == "string" ? v.length : 0) >= 24 ||
          "Description must be atleast 24 char.",
        v =>
          (typeof v == "string" ? v.length : 0) <= 8000 ||
          "Description must be 8000 or less char."
      ]
    };
  },
  computed: {
    userEmail() {
      return this.$store.state.user.email;
    }
  },
  methods: {
    discardChanges() {
      if (confirm("Discard changes?")) {
        this.error = "";
        this.title = "";
        this.content = "";
        this.short_description = "";
        this.editing = false;
      }
    },
    clearForm() {
      if (confirm("Clear the form?")) {
        this.error = "";
        this.title = "";
        this.content = "";
        this.short_description = "";
      }
    },
    preSubmit() {
      var errors = 0;

      if (
        typeof this.content == "string" &&
        (this.content.length < 24 || this.content.length > 8000)
      ) {
        this.error = "Content character length is invalid";
        errors++;
      }
      if (
        typeof this.short_description == "string" &&
        (this.short_description.length < 24 ||
          this.short_description.length > 100)
      ) {
        this.error = "Short description character length is invalid";
        errors++;
      }
      if (
        typeof this.title == "string" &&
        (this.title.length < 3 || this.title.length > 36)
      ) {
        this.error = "Title character length is invalid";
        errors++;
      }

      if (errors === 0 && confirm("Publish this post?")) {
        this.loading = true;
        this.submit();
      }
    },
    submit() {
      var data = {
        title: this.title,
        content: this.content,
        short_description: this.short_description,
        author: this.$store.state.user.email
      };
      console.log(data);
      var autoID =
        String(Date.now()) +
        "_" +
        String(Math.ceil(String(Math.random()) * 100));

      firebase
        .firestore()
        .collection("posts")
        .doc(autoID)
        .set(data)
        .then(() => {
          this.error = "";
          this.title = "";
          this.content = "";
          this.short_description = "";
          this.loading = false;
          this.editing = false;
          alert("Post is published!");
          this.$emit("create-post-published", autoID);
        })
        .catch(() => {
          this.error = "Failed to publish post, retry again later.";
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
