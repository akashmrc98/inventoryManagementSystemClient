<template lang="pug">
  center
    .modal.is-active.slideMeOpen
        .modal-background
            .modal-content
                .box.component.viewPos.ModalService.card.componentHead
                    .card-header PRODUCT INFORMATION
                    .card-body.box.component
                        .card-title
                            tr
                             th PRODUCT ID  
                             td {{product.product_id}}
                            tr
                             th PURCHASED ON
                             td {{product.purchased_date}}
                            tr
                             th WARRANTY
                             td {{product.warranty_period}}
                            tr
                             th MODEL
                             td {{product.model_no}}
                            tr
                             th SERIAL
                             td {{product.serial_no}}
                            tr
                             th COST
                             td {{product.unit_price}}
                            
                            center
                                .button.is-success.buttonmt(@click.prevent="Close")
                                    v-icon.Item(name="times") 
                                    | Close
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      product: {}
    };
  },
  computed: {
    ...mapGetters(["products"]),
    ...mapState({
      editAsset: state => state.Assets.editAsset
    })
  },

  mounted() {
    this.LoadProduct();
  },

  methods: {
    async LoadProduct() {
      var products = this.products;
      var sid = String(this.$route.params.id);
      var product = products.filter(prod => {
        return prod._id == sid;
      });
      this.product = product[0];
    },
    async Close() {
      this.$router.push("/alcpg/edit-asset/" + this.editAsset._id);
    }
  }
};
</script>
