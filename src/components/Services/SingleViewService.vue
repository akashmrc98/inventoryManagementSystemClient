<template lang="pug">
  center
    .modal.is-active.slideMeOpen
        .modal-background
            .modal-content
                .box.component.viewPos.ModalService.card.componentHead
                    .card-header SERVICE INFORMATION
                    .card-body.box.component
                        .card-title
                            tr
                             th SERVICE ID  
                             td {{product.service_id}}
                            tr
                             th SERVICED BY
                             td {{product.serviced_by}}
                            tr
                             th SERVICED ON
                             td {{product.serviced_on}}
                            tr
                             th CONTACT
                             td {{product.service_no}}
                            tr
                             th ADDRESS
                             td {{product.address}}
                            tr
                             th COST
                             td {{product.cost}}
                            tr
                             th NOTES
                             td {{product.notes}}
                            
                            center
                                .button.is-success.buttonmt(@click.prevent="Close")
                                    v-icon.Item(name="times") 
                                    | Close
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      product: {}
    };
  },
  computed: {
    ...mapGetters(["services"])
  },

  mounted() {
    this.LoadServices();
  },

  methods: {
    async LoadServices() {
      var products = this.services;
      var sid = String(this.$route.params.id);
      var product = products.filter(prod => {
        return prod._id == sid;
      });
      this.product = product[0];
    },
    async Close() {
      window.history.back();
    }
  }
};
</script>
