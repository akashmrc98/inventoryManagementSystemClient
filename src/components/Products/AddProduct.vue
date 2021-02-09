<template lang="pug">
.box.component.card 
  b-notification(title="Success!" show v-if="isSubmitted"  type="is-success" aria-close-label="Close message")
    p {{message}}
  b-notification(title="Warning!" show v-if="isError"  type="is-warning" aria-close-label="Close message" :class="close")
    p {{error}}
  center 
    h2.box.componentHead ADD NEW PRODUCT
    .card-body
    b-field(label='Purchased on')
        b-datepicker(v-model="Product.purchased_date" placeholder='Click to select...' class="input")

    b-field(label='Warranty period')
        b-datepicker(v-model="Product.warranty_period" placeholder='Click to select...', class="input" icon='calendar-today')

    b-field(label="Model")
        b-input(
              class="input" 
              v-model="Product.model_no"
              placeholder="enter model no" 
              required
              )
    b-field(label="Serial")
        b-input(
              class="input"
              placeholder="enter serial no"
              v-model="Product.serial_no"
              required
              )
       
    b-field(label="Unit Price")
        b-input(
              class="input"
              v-model="Product.unit_price"
              placeholder="enter unit price"
              type="number"
              required
              )
    .button.is-dark.card.buttonmt(@click.prevent="postCheck")
      v-icon.Item(name="plus")
      | Add Asset
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      Product: {
        purchased_date: null,
        warranty_period: null,
        model_no: "",
        serial_no: "",
        unit_price: "",
        id: this.$route.params.id
      },
      isSubmitted: false,
      close: "",
      isError: false,
      error: ""
    };
  },
  computed: {
    ...mapState({
      message: state => state.Assets.message,
      product: state => state.Assets.product
    })
  },

  methods: {
    postCheck() {
      if (this.Product.purchased_date != null) {
        this.isSubmitted = true;
        this.$store.dispatch("POST_PRODUCT", this.Product);
        this.close = "slideMe";
        this.refreshPage();
      } else {
        this.isError = true;
        this.error = "Fill Up Empty Fields";
        setTimeout(() => {
          this.isError = false;
          this.error = "";
        }, 2500);
      }
    },
    refreshPage() {
      setTimeout(() => {
        this.$store.dispatch("ALL_PRODUCTS", this.$route.params.id);
        var self = this;
        this.close = "";
        self.isSubmitted = false;
        self.Product = {
          purchased_date: null,
          warranty_period: null,
          model_no: "",
          serial_no: "",
          unit_price: "",
          id: this.$route.params.id
        };
      }, 3500);
    }
  }
};
</script>
