<template lang="pug">
  center.slideMeOpen

    b-loading(:active.sync='isLoading', :can-cancel='true')
      v-icon(name="sync" scale="5" spin)

    .columns.page
      .column.is-4      
        .card-body.box.component
          h2.box.componentHead EDIT ASSET  

          .modal(:class="active")
            .modal-background
              .modal-card.slideMe
                b-message.Message(:title="validStatement" show v-if="isSubmitted"  :type="validSingal" aria-close-label="Close message")
                  p {{message.message}}

          .columns
            .column 
              b-field(label="Product")
                b-input(
                  class="input"
                  :class="{ 'hasError': $v.editAsset.product_name.$error}"
                  v-model="$v.editAsset.product_name.$model"     
                  @input="$v.editAsset.product_name.$touch()"     
                  placeholder="Enter Product" 
                  required
                  )
              p(v-if="!$v.editAsset.product_name.minLength" class="error")  product name should have atleast 4 characters
            
            .column
              b-field(label="Category")
                b-input(
                  class="input"
                  :class="{ 'hasError': $v.editAsset.category.$error}"
                  v-model="$v.editAsset.category.$model"     
                  @input="$v.editAsset.category.$touch()"     
                  placeholder="Enter Category"
                  required
                  )
              p(v-if="!$v.editAsset.category.minLength" class="error")  category name should have atleast 4 characters
          
          .columns
            .column
              b-field(label="Vendor")
                b-input(
                  class="input"
                  :class="{ 'hasError': $v.editAsset.vendor.$error}"
                  v-model="$v.editAsset.vendor.$model"     
                  @input="$v.editAsset.vendor.$touch()"
                  placeholder="Enter Vendor" 
                  required
                  )
              p(v-if="!$v.editAsset.vendor.minLength" class="error") vendor   name should have atleast 4 characters
            
            .column
              b-field(label="Phone")
                b-input(
                  class="input"
                  :class="{ 'hasError': $v.editAsset.vendor_contact_no.$error}"
                  v-model="$v.editAsset.vendor_contact_no.$model"     
                  @input="$v.editAsset.vendor_contact_no.$touch()"
                  placeholder="Enter Phone Number"
                  required
                  )
              p(v-if="!$v.editAsset.vendor_contact_no.minLength" class="error")  mobile number should atleast 10 digits
              p(v-if="!$v.editAsset.vendor_contact_no.maxLength" class="error")  mobile number should not be more than 12 digits
              p(v-if="!$v.editAsset.vendor_contact_no.integer" class="error")   mobile number should only have digits
          
          .columns
            .column
              b-field(label="Address")
              b-input(type="textarea" maxlength="200" rows="2" class="inputArea"  v-model="editAsset.vendor_address" placeholder="Enter Address")
            .column
              b-field(label="Summary")
              b-input(type="textarea" maxlength="200" rows="2" class="inputArea"  v-model="editAsset.summary" placeholder="Enter Summary")
          
          .columns
            .column
              b-field(label="Comments")
              b-input(type="textarea" maxlength="200" rows="2" class="inputArea"  v-model="editAsset.comments" placeholder="Enter Comments")
            .column
              b-field(label="Notes")
              b-input(type="textarea" maxlength="200" rows="2" class="inputArea"    v-model="editAsset.notes" placeholder="Enter Notes")
          
          .columns
            .column
              b-field(label="Quantity")
                b-input(
                  class="input"
                  :class="{ 'hasError': $v.editAsset.product_quantity.$error}"
                  v-model="$v.editAsset.product_quantity.$model"     
                  @input="$v.editAsset.product_quantity.$touch()" 
                  placeholder="Enter quantity"
                  required
                  )
              p(v-if="!$v.editAsset.product_quantity.integer" class="error")  Quantity should be in number!
            .column
              b-field(label="Total-Price")
                b-input(
                  class="input"
                  :class="{ 'hasError': $v.editAsset.total_price.$error}"
                  v-model="$v.editAsset.total_price.$model"     
                  @input="$v.editAsset.total_price.$touch()" 
                  placeholder="Enter total price"
                  required)
              p(v-if="!$v.editAsset.total_price.numeric" class="error") Price   should be numeric!
          
          .columns
            .column
              center
                .button.is-warning.card.buttonmt(@click.prevent="postCheck")
                  v-icon.Item(name="edit") 
                  | Edit Asset
      
      .column.is-8
        product-home
</template>

<script>
import ProductHome from "../../pages/ProductHome";
import { mapState } from "vuex";
import {
  required,
  minLength,
  numeric,
  integer,
  maxLength
} from "vuelidate/lib/validators";
export default {
  components: {
    "product-home": ProductHome
  },

  data() {
    return {
      isSubmitted: false,
      active: "",
      isLoading: false,
      isFullPage: false,
      validSingal: "",
      validStatement: ""
    };
  },

  computed: {
    ...mapState({
      message: state => state.Assets.message,
      editAsset: state => state.Assets.editAsset
    })
  },

  mounted() {
    this.LoadEdit();
  },

  methods: {
    async postCheck() {
      this.putAsset();
      this.isLoading = true;
      setTimeout(() => {
        this.backEndValidataion();
      }, 500);
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

    async LoadEdit() {
      this.$store.dispatch("PREVIEW_ASSET", this.$route.params.id);
    },

    async putAsset() {
      const data = this.editAsset;
      this.$store.dispatch("PUT_ASSET", data);
      this.isSubmitted = true;
    },

    refreshPage() {
      this.$v.$reset();
      this.LoadEdit();
      setTimeout(() => {
        var self = this;
        self.isLoading = false;
        self.isSubmitted = false;
        self.active = "";
        self.validSingal = "";
        self.validStatement = "";
        this.$store.commit("CLEAR_MESSAGE");
      }, 1500);
    }
  },

  validations: {
    editAsset: {
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
