<template lang="pug">
div
  center
    c-footer.is-fullhd  
    c-navbar.is-fullhd
    router-view.is-fullhd  
</template>
<script>
import Navbar from "./reusables/Navbar.vue";
import Footer from "./reusables/Footer.vue";
import { mapState } from "vuex";

export default {
  components: {
    "c-navbar": Navbar,
    "c-footer": Footer
  },
  computed: {
    ...mapState({
      counter: state => state.User.counter
    })
  }
};
</script>
