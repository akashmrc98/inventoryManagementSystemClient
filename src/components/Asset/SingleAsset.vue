<template lang="pug">
  center
    .modal.is-active.slideMeOpen
        .modal-background
            .modal-content
                .box.component.viewPos.componentHead
                    .card-header ASSET INFORMATION
                    .card-body.box.component
                        .card-title
                            tr
                             th ASSET ID  
                             td {{editAsset.asset_id}}
                            tr
                             th PRODUCT NAME
                             td {{editAsset.product_name}}
                            tr
                             th VENDOR
                             td {{editAsset.vendor}}
                            tr
                             th CONTACT
                             td {{editAsset.vendor_contact_no}}
                            tr
                             th ADDRESS
                             td {{editAsset.vendor_address}}
                            tr
                             th STOCK
                             td {{editAsset.product_quantity}}
                            tr
                             th TOTAL COST
                             td {{editAsset.total_price}}
                            
                            center
                                .button.is-success.buttonmt(@click.prevent="Close")
                                    v-icon.Item(name="times") 
                                    | Close
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      editAsset: state => state.Assets.editAsset
    })
  },
  mounted() {
    this.LoadEdit();
  },
  methods: {
    async LoadEdit() {
      this.$store.dispatch("PREVIEW_ASSET", this.$route.params.id);
    },
    async Close() {
      this.$router.push("/alcpg/all-assets/");
    }
  }
};
</script>
