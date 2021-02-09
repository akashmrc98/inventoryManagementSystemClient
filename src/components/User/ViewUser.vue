<template lang="pug">
  center
    .modal.is-active.slideMeOpen
        .modal-background
            .modal-content
                .viewPos.component.box.componentHead 
                    .card-header USER INFORMATION
                    .card-body.box.component
                        .card-title
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
                                .button.is-success.buttonmt(@click.prevent="Close")
                                    v-icon.Item(name="times") 
                                    | Close
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      user: state => state.User.user
    })
  },
  mounted() {
    this.ViewUser();
  },
  methods: {
    async ViewUser() {
      this.$store.dispatch("VIEW_USER", this.$route.params.id);
    },
    async Close() {
      window.history.back();
    }
  }
};
</script>
