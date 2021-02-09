<template lang="pug">
.modal.is-active
  .modal-background
    .modal-content
      .box.component.card(:class="close").modalpos.ModalService
        h2.box.componentHead UPDATE SERVICE
        .card-body
          b-field(label='Serviced by')
              b-input(v-model="Service.serviced_by" placeholder='Enter Serviced by' class="input")
          b-field(label='Serviced on')
              b-input(v-model="Service.serviced_on" placeholder='Enter Serviced on', class="input")
          b-field(label='Mobile')
              b-input(v-model="Service.service_no" placeholder='Enter Mobile', class="input")
          b-field(label="Address")
                 b-input(type="textarea" maxlength="200" rows="2"  class="inputArea" v-model="Service.address" placeholder="Enter Address")
          b-field(label="Notes")
                 b-input(type="textarea" maxlength="200" rows="2"  class="inputArea" v-model="Service.notes" placeholder="Enter Notes")
          b-field(label="Cost")
              b-input(
                    class="input"
                    v-model="Service.cost"
                    placeholder="enter unit price"
                    type="number"
                    required
                    )
          center
            .button.is-warning.card.buttonmt(@click.prevent="postCheck")
              v-icon.Item(name="edit")
              | Update Service
            .button.is-success.Item.card(@click.prevent="Cancel").buttonmt
              v-icon.Item(name="times")
              | Cancel
    b-loading(:is-full-page='isFullPage',:active.sync='isLoading', :can-cancel='true')
      v-icon(name="sync" scale="5" spin)
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isSubmitted: false,
      isLoading: false,
      isFullPage: true,
      close: "slideMeDelete",
      isError: false,
      error: ""
    };
  },
  computed: {
    ...mapState({
      service_ids: state => state.Assets.service_ids,
      Service: state => state.Assets.service
    })
  },

  mounted() {
    this.loadProduct();
  },
  methods: {
    async loadProduct() {
      this.$store.dispatch("SNAPSHOT_SERVICE", this.service_ids);
    },
    async postCheck() {
      this.isSubmitted = true;
      this.isLoading = true;
      var service = {
        service: this.Service,
        assetId: this.service_ids.assetId,
        serviceId: this.service_ids.serviceId
      };
      this.$store.dispatch("PUT_SERVICE", service);
      this.refreshPage();
    },
    async refreshPage() {
      this.close = "slideMeDeleteClose";
      setTimeout(() => {
        var self = this;
        self.$store.commit("CLEAR_MESSAGE");
        self.isLoading = false;
        self.isSubmitted = false;
        self.close = "";
      }, 500);
      window.history.back();
    },
    async Cancel() {
      this.close = "slideMeDeleteClose";
      setTimeout(() => {
        var self = this;

        self.close = "";
      }, 500);
      window.history.back();
    }
  }
};
</script>
