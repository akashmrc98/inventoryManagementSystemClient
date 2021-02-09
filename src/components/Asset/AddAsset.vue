<template lang="pug">
.box.component
  center
    b-notification.box(title="Warning!" show v-if="isError" type="is-warning")
      p {{errmsg}}
    b-loading(:active.sync='isLoading', :can-cancel='true')
     v-icon(name="sync" scale="6" spin)
    h2.box.componentHead ADD NEW ASSET
    .card-body  
      .modal(:class="active")
        .modal-background
          .modal-card.slideMe
            b-message.Message(:title="validStatement" show v-if="isSubmitted" :type="validSingal"  aria-close-label="Close message")
              p.buts {{message.message}}
      .columns
        .column 
          b-field(label="Product")
            b-input(
              class="input"
              :class="{ 'hasError': $v.Asset.product_name.$error}"
              v-model="$v.Asset.product_name.$model"     
              @input="$v.Asset.product_name.$touch()"
              placeholder="Enter Product" 
              required
              )
          p(v-if="!$v.Asset.product_name.minLength" class="error") product name should have atleast 4 characters 
        .column
          b-field(label="Category")
            b-input(
              class="input"
              :class="{ 'hasError': $v.Asset.category.$error}"
              v-model="$v.Asset.category.$model"
              @input="$v.Asset.category.$touch()"
              placeholder="Enter Category"
              required
              )
          p(v-if="!$v.Asset.category.minLength" class="error") category name should have atleast 4 characters 
      .columns
        .column
          b-field(label="Vendor")
            b-input(
              class="input"
              :class="{ 'hasError': $v.Asset.vendor.$error}"
              v-model="$v.Asset.vendor.$model"
              @input="$v.Asset.vendor.$touch()" 
              placeholder="Enter Vendor" 
              required
              )
          p(v-if="!$v.Asset.vendor.minLength" class="error") vendor name should have atleast 4 characters
        .column
          b-field(label="Phone")
            b-input(
              class="input"
              :class="{ 'hasError': $v.Asset.vendor_contact_no.$error}"
              v-model="$v.Asset.vendor_contact_no.$model"
              @input="$v.Asset.vendor_contact_no.$touch()" 
              placeholder="Enter Phone Number"
              required
              )
          p(v-if="!$v.Asset.vendor_contact_no.minLength" class="error") mobile number should atleast 10 digits
          p(v-if="!$v.Asset.vendor_contact_no.maxLength" class="error") mobile number should not be more than 12 digits
          p(v-if="!$v.Asset.vendor_contact_no.integer" class="error") mobile number should only have digits
      .columns
        .column
          b-field(label="Address")
           b-input(type="textarea" maxlength="200" rows="2"  class="inputArea" v-model="Asset.vendor_address" placeholder="Enter Address")
        .column
          b-field(label="Summary")
           b-input(type="textarea" maxlength="200" rows="2"  class="inputArea" v-model="Asset.summary" placeholder="Enter Summary")
      .columns
        .column
          b-field(label="Comments")
           b-input(type="textarea" maxlength="200" rows="2"   class="inputArea" v-model="Asset.comments" placeholder="Enter Comments")
        .column
          b-field(label="Notes")
           b-input(type="textarea" maxlength="200" rows="2" class="inputArea" v-model="Asset.notes" placeholder="Enter Notes")
      .columns
        .column
          b-field(label="Quantity")
            b-input(
              class="input"
              :class="{ 'hasError': $v.Asset.product_quantity.$error}"
              v-model="$v.Asset.product_quantity.$model"
              @input="$v.Asset.product_quantity.$touch()"  
              placeholder="Enter quantity"
              required
              )
          p(v-if="!$v.Asset.product_quantity.integer" class="error") Quantity should be in number!
        .column
          b-field(label="Total-Price")
            b-input(
              class="input"
              :class="{ 'hasError': $v.Asset.total_price.$error}"
              v-model="$v.Asset.total_price.$model"
              @input="$v.Asset.total_price.$touch()"
              placeholder="Enter total price"
              required)
          p(v-if="!$v.Asset.total_price.numeric" class="error") Price should be numeric!
      .columns
        .column
          center
            .button.is-dark.card.buttonmt(@click.prevent="postCheck")
              v-icon.Item(name="plus")
              | Add Asset
              
              
        
</template>

<script>
import { mapState } from "vuex";
import {
  required,
  minLength,
  numeric,
  integer,
  maxLength
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      Asset: {
        product_name: "",
        category: "",
        vendor: "",
        vendor_contact_no: "",
        vendor_address: "",
        summary: "",
        comments: "",
        notes: "",
        product_quantity: null,
        total_price: null
      },
      isSubmitted: false,
      isError: false,
      errmsg: "",
      active: "",
      isLoading: false,
      isFullPage: false,
      validSingal: "",
      validStatement: ""
    };
  },

  computed: {
    ...mapState({
      message: state => state.Assets.message
    })
  },

  methods: {
    async postCheck() {
      if (this.$v.$error == true) {
        this.isError = true;
        this.errmsg = "Invalid Inputs!";
        setTimeout(() => {
          this.isError = false;
          this.errmsg = "";
        }, 2500);
      } else {
        this.postAsset();
        this.isLoading = true;
        setTimeout(() => {
          this.backEndValidataion();
        }, 500);
      }
    },

    async backEndValidataion() {
      this.isLoading = false;
      if (this.message.status == 422) {
        this.active = "is-active";
        this.validSingal = "is-warning";
        this.validStatement = "Warning!";
      } else {
        this.active = "is-active";
        this.validSingal = "is-success";
        this.validStatement = "Successful";
      }
      this.refreshPage();
    },

    postAsset() {
      const data = this.Asset;
      this.$store.dispatch("ADD_ASSET", data);
      this.isSubmitted = true;
    },

    refreshPage() {
      setTimeout(() => {
        var self = this;
        this.$v.$reset();
        this.$store.dispatch("ALL_ASSETS");
        self.isLoading = false;
        self.isSubmitted = false;
        self.active = "";
        this.validSingal = "";
        this.validStatement = "";
        self.Asset = {
          product_name: "",
          category: "",
          vendor: "",
          vendor_contact_no: "",
          vendor_address: "",
          summary: "",
          comments: "",
          notes: "",
          product_quantity: null,
          total_price: null
        };
      }, 1500);
    }
  },
  validations: {
    Asset: {
      product_name: {
        required,
        minLength: minLength(4)
      },
      category: {
        required,
        minLength: minLength(4)
      },
      vendor: {
        required,
        minLength: minLength(4)
      },
      vendor_contact_no: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(12),
        integer
      },
      product_quantity: {
        required,
        integer
      },
      total_price: {
        required,
        numeric
      }
    }
  }
};
</script>
