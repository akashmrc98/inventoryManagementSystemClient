<template lang="pug">
  .cover
    .black
     .modal.is-active.slideMeOpen
       .modal-background
         .modal-content
           .box.modalpos(title='Delete Asset' type='is-danger')
             .buts.Msg CONFIRM DELETE
             center
              .box.buts.table.box
                tr.buts
                 th ASSET ID  
                 td {{editAsset.asset_id}}
                tr.buts
                 th PRODUCT NAME
                 td {{editAsset.product_name}}
                tr.buts
                 th VENDOR
                 td {{editAsset.vendor}}
                tr.buts
                 th CONTACT
                 td {{editAsset.vendor_contact_no}}
                tr.buts
                 th ADDRESS
                 td {{editAsset.vendor_address}}
                tr.buts
                 th STOCK
                 td {{editAsset.product_quantity}}
                tr.buts
                 th TOTAL COST
                 td {{editAsset.total_price}}
              center
               button.button.is-danger(@click="Delete") Delete   
               button.button.is-warning(@click="Cancel") Cancel
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      isDeleted: true
    };
  },

  computed: {
    ...mapState({
      editAsset: state => state.Assets.editAsset,
      user: state => state.User.token
    })
  },

  mounted() {
    this.LoadAsset();
  },

  methods: {
    async Delete() {
      var delete_info = {
        id: this.$route.params.id,
        asset: this.editAsset,
        user: this.user
      };
      this.$store.dispatch("DELETE_ASSET", delete_info);
      this.$store.dispatch("ALL_ASSETS");
      this.Loader();
    },

    async Loader() {
      setTimeout(() => {
        this.$router.push("/alcpg/all-assets/");
      }, 500);
    },

    async LoadAsset() {
      this.$store.dispatch("PREVIEW_ASSET", this.$route.params.id);
    },

    async Cancel() {
      setTimeout(() => {
        this.$router.push("/alcpg/all-assets/");
      }, 500);
    }
  }
};
</script>
