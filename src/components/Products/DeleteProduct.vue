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
                 tr.buts
                  th PRODUCT ID  
                  td {{product.product_id}}
                 tr.buts
                  th PURCHASED_ON
                  td {{product.purchased_date}}
                 tr.buts
                  th WARRANTY
                  td {{product.warranty_period}}
                 tr.buts
                  th MODEL_NO
                  td {{product.model_no}}
                 tr.buts
                  th SERIAL_NO
                  td {{product.serial_no}}
                 tr.buts
                  th PRICE
                  td {{product.unit_price}}
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
      product_ids: state => state.Assets.product_ids,
      product: state => state.Assets.product,
      editAsset: state => state.Assets.editAsset
    })
  },
  mounted() {
    this.loadProduct();
  },
  methods: {
    async loadProduct() {
      this.$store.dispatch("SNAPSHOT_PRODUCT", this.product_ids);
      this.active = "is-active";
      this.isClear = true;
    },
    Delete() {
      var product = {
        assetId: this.product_ids.assetId,
        productId: this.product_ids.productId
      };
      this.$store.dispatch("DELETE_PRODUCT", product);
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
        this.$store.dispatch("ALL_PRODUCTS", this.editAsset._id);
      }, 500);
      this.$router.push("/alcpg/edit-asset/" + this.editAsset._id);
    },
    async Cancel() {
      var self = this;
      self.close = "slideMeDeleteClose";
      setTimeout(() => {
        this.$store.dispatch("ALL_PRODUCTS", this.editAsset._id);
        self.active = "";
        self.close = "";
        self.isClear = false;
      }, 500);
      this.$router.push("/alcpg/edit-asset/" + this.editAsset._id);
    }
  }
};
</script>

<style lang="scss"></style>
