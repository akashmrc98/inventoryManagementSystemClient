<template lang="pug">
.box.columns.page
  .cover
    b-loading(:is-full-page='isFullPage', :active.sync='isLoading', :can-cancel='true')
      v-icon(name="sync" scale="5" spin)
    .black
     .modal(class="is-active")
       .modal-background
         .modal-content
           .box.modalpos(title='Delete Asset', :class="close" type='is-danger')
             .buts.Msg CONFIRM DELETE
             center
              .box.buts.table.box
                tr
                 th FIRST NAME  
                 td {{user.first_name}}
                tr
                 th LAST NAME
                 td {{user.last_name}}
                tr
                 th DATE OF BIRTH
                 td {{user.dob}}
                tr
                 th GENDER
                 td {{user.gender}}
                tr
                 th MOBILE
                 td {{user.mobile}}
                tr
                 th ADDRESS
                 td {{user.address}}
                tr
                 th USER NAME
                 td {{user.username}}
                tr
                 th EMAIL
                 td {{user.email}}
              center
               button.button.is-danger(@click="Delete") Delete   
               button.button.is-warning(@click="Cancel") Cancel
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isDeleted: true,
      active: "is-active",
      isLoading: false,
      isFullPage: true,
      close: "slideMeDelete"
    };
  },
  computed: {
    ...mapState({
      user: state => state.User.user
    })
  },
  mounted() {
    this.LoadUser();
  },
  methods: {
    async Delete() {
      this.$store.dispatch("DELETE_USER", this.$route.params.id);
      this.$store.dispatch("VIEW_USERS");
      this.isLoading = true;
      this.close = "slideMeDeleteClose";
      this.Loader();
    },
    async Loader() {
      setTimeout(() => {
        this.isLoading = false;
        this.close = "";
        window.history.back();
      }, 500);
    },
    async LoadUser() {
      this.$store.dispatch("VIEW_USER", this.$route.params.id);
    },
    async Cancel() {
      this.close = "slideMeDeleteClose";
      setTimeout(() => {
        this.isDeleted = false;
        this.active = "";
        window.history.back();
      }, 500);
    }
  }
};
</script>
