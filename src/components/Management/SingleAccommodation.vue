<template lang="pug">
  center
    .modal.is-active.slideMeOpen
        .modal-background
            .modal-content
                  .box.component.componentHead
                    .card-header ACCOMMODATION INFORMATION
                    .card-body.box.component
                        .card-title
                            tr
                             th  ID  
                             th INCHARGE
                             th CONTACT
                             th PURPOSE
                             th BOUGHT ON
                             th RETURN ON
                            tr
                             td {{accommodation.ticket_no}}
                             td {{accommodation.in_charge}}                             
                             td {{accommodation.in_charge_no}}
                             td {{accommodation.purpose}}
                             td {{accommodation.bought_on}}
                             td {{accommodation.return_on}}

                            br
                            tr
                             th REMARKS
                             th NOTES
                             th COMMENTS
                             th CONDITION
                            tr
                             td {{accommodation.remarks}}
                             td {{accommodation.notes}} 
                             td {{accommodation.comments}} 
                             td {{accommodation.condition}} 
                            .componentHead.card.buttonmt PRODUCTS
                            .columns
                              .column
                                .componentHead.card.box.buttonmt Transactional
                                div.buttonmt(v-for="(product, index) in accommodation.products" :key='index')                                 
                                        tr 
                                            th ID
                                            th PRODUCT
                                            th STOCK
                                            th(v-if="product.stock") STOCK RETURNED
                                        tr
                                            td {{product.product_id}}
                                            td {{product.product_name}}
                                            td {{product.stock}}               
                                            td(v-if="product.stock")
                                              b-checkbox(v-model="checked" type="is-dark" size="is-small" :native-value='product.product_id')
                                div(v-for="(val, ite) in checked" :key="val").columns.buttonmt.viewPos      
                                  .column
                                      p {{val}}
                                  .column
                                     b-input(class="input" :name="stock[ite]" v-model="stock[ite]")

                                .button.has-background-success.has-text-white-ter.buttonmt(v-if="hider" @click.prevent="RedirectReturnSingleAsset   (accommodation._id)")                                             
                                  v-icon.Item(name="exchange-alt")
                                  | Return Selected Assets            
                              .column
                                .componentHead.card.box.buttonmt History
                                div.buttonmt(v-for="(productx, indexx) in accommodation.non_transactional_products" :key='indexx')                                 
                                        tr 
                                            th ID
                                            th PRODUCT
                                            th STOCK                                        
                                        tr
                                            td {{productx.product_id}}
                                            td {{productx.product_name}}
                                            td {{productx.stock}}                                                          

                            center(v-if="disableDeleteReturn")                                
                                .button.has-background-info.has-text-white-ter.buttonmt(@click.prevent="RedirectReturn(accommodation._id)") 
                                    v-icon.Item(name="exchange-alt")
                                    | Return All Asset
                                .button.has-background-danger.has-text-white-ter.buttonmt(@click.prevent="RedirectDelete(accommodation._id)") 
                                    v-icon.Item(name="trash-alt")
                                    | Delete                                
                            center
                             .button.is-success.buttonmt(@click.prevent="Close")
                              v-icon.Item(name="times") 
                              | Close
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      disableDeleteReturn: true,
      checked: [],
      stock: [],
      hider: false,
      non_transcation: "non_transcational_products"
    };
  },
  computed: {
    ...mapState({
      accommodation: state => state.Management.accommodation
    })
  },

  watch: {
    checked: function(val) {
      if (val.length > 0) {
        this.hider = true;
      }
      if (val.length == 0) {
        this.hider = false;
      }
    }
  },

  mounted() {
    this.LoadAccommodation();
  },

  methods: {
    async LoadAccommodation() {
      this.$store.dispatch("SINGLE_ACCOMMODATION_VIEW", this.$route.params.id);
      setTimeout(() => {
        var deleteDisable = this.accommodation.return_on;
        if (deleteDisable === null) {
          this.disableDeleteReturn = true;
        } else {
          this.disableDeleteReturn = false;
        }
      }, 500);
    },
    async Close() {
      this.$router.push("/alcpg/View-Accommodations");
    },
    async RedirectReturn(id) {
      this.$router.push("/alcpg/return-asset/" + id);
    },
    async RedirectDelete(id) {
      this.$router.push("/alcpg/delete-accommodation/" + id);
    },
    RedirectReturnSingleAsset(id) {
      var assetInfo = {
        assetId: id,
        productId: this.checked,
        stock: this.stock
      };
      this.$store.dispatch("RETURN_SINGLE_ASSET", assetInfo);
      this.checked = [];
      this.stock = [];
      setTimeout(() => {
        this.LoadAccommodation();
      }, 250);
    }
  }
};
</script>
