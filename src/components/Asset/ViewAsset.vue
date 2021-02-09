<template lang="pug">
div.box.component
  h2.box.componentHead LAST ADDED ASSETS
  .card-body
    .table-container
     table.table.is-hoverable.is-fullwidth.is-bordered.is-narrow
       thead
         tr
           th ID
           th Product 
           th Category
           th Options
       tbody
         tr(v-for="(asset,index) in assets" :key="index") 
           td {{asset.asset_id}}
           td {{asset.product_name}}
           td {{asset.category}}
           td
            .button.has-background-success.has-text-white-ter(@click.prevent="RedirectSingleView(asset._id)") 
              v-icon.Item(name="th-list")
              | View
            .button.has-background-warning.has-text-dark-ter(@click.prevent="RedirectEdit(asset._id)")
              v-icon.Item(name="edit")
              | Edit
     
            .button.has-background-danger.has-text-white-ter(@click.prevent="RedirectDelete(asset._id)") 
              v-icon.Item(name="trash-alt")
              | Delete
            .button.has-background-info.has-text-white-ter(@click="Services(asset._id)")
              v-icon.Item(name="cog" spin)
              | Services
                

                  
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      perPage: 10,
      search: ""
    };
  },
  computed: {
    ...mapState({
      assets: state => state.Assets.assets.slice(0, 13)
    })
  },

  mounted() {
    this.LoadPosts();
  },

  methods: {
    async LoadPosts() {
      this.$store.dispatch("ALL_ASSETS");
    },
    async RedirectEdit(id) {
      setTimeout(() => {
        this.$router.push("/alcpg/edit-asset/" + id);
      }, 500);
    },
    async RedirectDelete(id) {
      setTimeout(() => {
        this.$router.push("/alcpg/delete-asset/" + id);
      }, 500);
    },
    async RedirectSingleView(id) {
      setTimeout(() => {
        this.$router.push("/alcpg/single-asset/" + id);
      }, 500);
    },
    async Services(id) {
      setTimeout(() => {
        this.$router.push("/alcpg/service-product/" + id);
      }, 500);
    }
  }
};
</script>
