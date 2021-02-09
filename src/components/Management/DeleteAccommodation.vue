<template lang="pug">
.box.columns.page
  .modal(class="is-active")
    .modal-background
      .modal-content
        .modalpos.box(title='Delete Asset', :class="close" type='is-danger')
          .buts.box.Msg CONFIRM DELETE 
          center
           .box.buts.table.box
             tr.buts
              th ID 
              td {{accommodation.ticket_no}}
             tr.buts
              th PURPOSE
              td {{accommodation.purpose}}
             tr.buts
              th INCHARGE
              td {{accommodation.in_charge}}
             tr.buts
              th CONTACT
              td {{accommodation.in_charge_no}}
             tr.buts
              th BOUGHT ON
              td {{accommodation.bought_on}}
           center
            button.button.is-danger(@click="Delete(accommodation._id)") Delete   
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
      accommodation: state => state.Management.accommodation,
      user: state => state.User.token
    })
  },

  mounted() {
    this.LoadAccommodation();
  },

  methods: {
    async LoadAccommodation() {
      this.$store.dispatch("SINGLE_ACCOMMODATION_VIEW", this.$route.params.id);
    },

    async Cancel() {
      this.$router.push("/alcpg/view-accommodation/" + this.$route.params.id);
    },

    async Delete(id) {
      var info = {
        accommodation: this.accommodation,
        id: id,
        user: this.user
      };
      this.$store.dispatch("DELETE_ACCOMMODATION", info);
      this.$store.dispatch("VIEW_ACCOMMODATIONS");
      setTimeout(() => {
        this.$router.push("/alcpg/view-accommodations/");
      }, 250);
    }
  }
};
</script>
