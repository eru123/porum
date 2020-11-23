<template>
  <div>
    <div class="cross-container">
      <div class="left">LEFT</div>
      <div class="center container">
        <h1>Home</h1>
        <CreatePost /> <br />
        <Posts />
      </div>
      <div class="right">RIGHT</div>
    </div>
  </div>
</template>

<script>
import auther from "@/plugins/auther";
import CreatePost from "@/components/CreatePost";
import Posts from "@/components/Posts";
export default {
  name: "Home",
  created() {
    auther.requireAuth(this.$store.state, this.$router);
    this.$store.commit("changeRequireAuth", true);
  },
  components: {
    CreatePost,
    Posts,
  },
};
</script>
