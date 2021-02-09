<template lang="pug">
div
  .modal.is-active
    .modal-background
      .modal-content
            .box.component.card(:class="close").modalpos.ModalService
              center
                h2.box.componentHead UPDATE PRODUCT
                .card-body
                b-field(label='Purchased on')
                    b-input(v-model="product.purchased_date" placeholder='Click to select...' class="input")

                b-field(label='Warranty period')
                    b-input(v-model="product.warranty_period" placeholder='Click to select...', class="input"   icon='calendar-today')

                b-field(label="Model")
                    b-input(
                          class="input" 
                          v-model="product.model_no"
                          placeholder="enter model no" 
                          required
                          )
                b-field(label="Serial")
                    b-input(
                          class="input"
                          placeholder="enter serial no"
                          v-model="product.serial_no"
                          required
                          )

                b-field(label="Unit Price")
                    b-input(
                          class="input"
                          v-model="product.unit_price"
                          placeholder="enter unit price"
                          type="number"
                          required
                          )
                .button.is-warning.card(@click.prevent="postCheck")
                  v-icon.Item(name="edit")
                  | Update Product 
                .button.is-success.Item.card(@click.prevent="Cancel")
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
    },
    async postCheck() {
      this.isSubmitted = true;
      this.isLoading = true;
      var product = {
        product: this.product,
        assetId: this.product_ids.assetId,
        productId: this.product_ids.productId
      };
      this.$store.dispatch("PUT_PRODUCT", product);
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
      this.$router.push("/alcpg/edit-asset/" + this.editAsset._id);
    },
    async Cancel() {
      this.close = "slideMeDeleteClose";
      setTimeout(() => {
        var self = this;
        self.close = "";
      }, 500);
      this.$router.push("/alcpg/edit-asset/" + this.editAsset._id);
    }
  }
};
</script>
