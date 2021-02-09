<template lang="pug">
div.component
  b-loading(:active.sync='isLoading', :can-cancel='true')
    v-icon(name="sync" scale="5" spin)
  .cover(v-if="isClear")
    .black
     .modal(:class="active")
       .modal-background
         .modal-content   
           .modalpos(title='Delete Product', type='is-danger' :class="close").box
            .buts.Msg CONFIRM DELETE
            center
              .box.buts.table
                tr
                 th SERVICE ID  
                 td {{service.service_id}}
                tr
                 th SERVICED BY
                 td {{service.serviced_by}}
                tr
                 th SERVICED ON
                 td {{service.serviced_on}}
                tr
                 th CONTACT
                 td {{service.service_no}}
                tr
                 th ADDRESS
                 td {{service.address}}
                tr
                 th COST
                 td {{service.cost}}
                tr
                 th NOTES
                 td {{service.notes}}
              center
               button.button.is-danger(@click.prevent="Delete") Delete   
               button.button.is-warning(@click.prevent="Cancel") Cancel
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isSubmitted: false,
      isLoading: false,
      active: "",
      isClear: false,
      close: "slideMeDelete"
    };
  },
  computed: {
    ...mapState({
      service_ids: state => state.Assets.service_ids,
      service: state => state.Assets.service
    })
  },

  mounted() {
    this.loadProduct();
  },
  methods: {
    async loadProduct() {
      this.$store.dispatch("SNAPSHOT_SERVICE", this.service_ids);
      this.active = "is-active";
      this.isClear = true;
    },
    Delete() {
      var service = {
        assetId: this.service_ids.assetId,
        serviceId: this.service_ids.serviceId
      };
      this.$store.dispatch("DELETE_SERVICE", service);
      this.isSubmitted = true;
      this.isLoading = true;
      this.close = "slideMeDeleteClose";
      this.refreshPage();
    },
    refreshPage() {
      setTimeout(() => {
        var self = this;
        self.isLoading = false;
        self.close = "";
        self.isSubmitted = false;
        self.$store.commit("CLEAR_MESSAGE");
        window.history.back();
      }, 500);
    },
    async Cancel() {
      var self = this;
      self.close = "slideMeDeleteClose";
      setTimeout(() => {
        self.$store.commit("CLEAR_MESSAGE");
        self.active = "";
        self.close = "";
        self.isClear = false;
        window.history.back();
      }, 500);
    }
  }
};
</script>

<style lang="scss"></style>
