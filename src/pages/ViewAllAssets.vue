<template lang="pug">
div.page.box.slideMeOpen
  .component.box
      h2.box.componentHead ASSETS
      .card-body    
        .columns
          .column.is-2
            b-input.input(v-model="search" placeholder="Search....!")
          .column.is-2
            b-select(name="" v-model="perPage" placeholder="Select cells..!")
              option(value="5") 5 cells
              option(value="10") 10 cells
              option(value="15") 15 cells
              option(value="20") 20 cells
              option(value="25") 25 cells
          .column.is-6
          .column.is-3
            a.is-dark(@click="prevPageController")
              v-icon.Item(name="caret-square-left" scale="3")   
            a.is-dark(@click="nextPageController")  
              v-icon.Item(name="caret-square-right" scale="3") 
            p {{currentPage+1}}/{{lastPage}}
        .table-container
         table.table.is-hoverable.is-fullwidth.is-bordered.is-narrow
           thead
             tr
               th ID 
               th Product 
               th Category
               th Vendor
               th Contact
               th Stock
               th Price 
               th Options
           tbody
             tr(v-for="(asset,index) in perPagefunc" :key="index") 
               td {{asset.asset_id}} 
               td {{asset.product_name}}
               td {{asset.category}}
               td {{asset.vendor}}
               td {{asset.vendor_contact_no}}
               td {{asset.product_quantity}} 
               td {{asset.total_price}} ₹
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
      perPage: 15,
      search: "",
      currentPage: 0,
      nextPage: 0,
      total_pages: 0,
      f_item: 0,
      l_item: 0,
      items_on_page: [],
      total_items: 0,
      lastPage: 0
    };
  },
  computed: {
    ...mapState({
      assets: state => state.Assets.assets
    }),
    searchFilter: {
      get: function() {
        return this.assets.filter(product => {
          return (
            product.asset_id.match(this.search) ||
            product.product_name.match(this.search) ||
            product.category.match(this.search) ||
            product.vendor.match(this.search) ||
            product.vendor_contact_no.match(this.search)
          );
        });
      }
    },
    perPagefunc: {
      get: function() {
        return this.searchFilter.slice(this.f_item, this.l_item);
      }
    }
  },

  watch: {
    perPage: function(val) {
      this.perPage = val;
      this.search = "";
      this.currentPage = 0;
      this.nextPage = 0;
      this.total_pages = 0;
      this.f_item = 0;
      this.l_item = 0;
      this.items_on_page = [];
      this.total_items = 0;
      this.paginate();
    }
  },

  mounted() {
    this.LoadPosts();
    setTimeout(() => {
      this.paginate();
    }, 100);
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

    async paginate() {
      this.total_items = this.assets.length;
      this.total_pages = Math.ceil(this.total_items / this.perPage);
      for (let i = 1; i <= this.total_pages; i++) {
        this.items_on_page.push(i * this.perPage);
      }
      this.currentPage = 0;
      this.lastPage = this.items_on_page.length;
      if (this.lastPage < 0) {
        this.lastPage = 1;
      }
      this.f_item = this.items_on_page[this.currentPage] - this.perPage;
      this.l_item = this.items_on_page[this.currentPage];
    },

    async nextPageController() {
      if (this.currentPage < this.total_pages - 1) {
        this.currentPage++;
        this.f_item = this.items_on_page[this.currentPage] - this.perPage;
        this.l_item = this.items_on_page[this.currentPage];
      }
    },

    async prevPageController() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.l_item = this.items_on_page[this.currentPage];
        this.f_item = this.items_on_page[this.currentPage] - this.perPage;
      }
    },

    async RedirectDelete(id) {
      setTimeout(() => {
        this.$router.push("/alcpg/delete-asset/" + id);
      }, 500);
    },
    async RedirectSingleView(id) {
      setTimeout(() => {
        this.$router.push("/alcpg/single-asset/" + id);
      }, 0);
    },
    async Services(id) {
      this.$router.push("/alcpg/service-product/" + id);
    }
  }
};
</script>
