<template lang="pug">
div.box.component
 center
  b-loading(:is-full-page='isFullPage', :active.sync='isLoading', :can-cancel='true')
   v-icon(name="sync" scale="5" spin)
  h2.box.componentHead PRODUCTS
  .card-body
    .columns
      .column.is-4
        b-input.input(v-model="search" placeholder="Search....!")
      .column.is-2
        b-select(name="" v-model="perPage" placeholder="Select cells..!")
          option(value="5") 5 cells
          option(value="10") 10 cells
          option(value="15") 15 cells
          option(value="20") 20 cells
          option(value="25") 25 cells          
      .column.is-2
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
           th Purchased on
           th Serial
           th Model
           th Options
       tbody
         tr(v-for="product in perPagefunc") 
           td {{product.purchased_date}}
           td {{product.serial_no}}
           td {{product.model_no}}
           td
              .button.has-background-success.has-text-white-ter(@click="SingleProduct(product._id)") 
                  v-icon.Item(name="th-list")
                  | View
              .button.has-background-warning.has-text-dark-ter(@click="ProductPreview(product._id)")
                v-icon.Item(name="edit")
                | Edit
              .button.has-background-danger.has-text-white-ter(@click="DeletePreview(product._id)")
                v-icon.Item(name="trash-alt")
                | Delete

                  
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      perPage: 15,
      search: "",
      active: "",
      isFullPage: true,
      isLoading: false,
      activeEdit: "",
      close: "",
      currentPage: 0,
      nextPage: 0,
      total_pages: 0,
      f_item: 0,
      l_item: 0,
      items_on_page: [],
      total_items: 0,
      lastPage: 1
    };
  },

  computed: {
    ...mapState({
      products: state => state.Assets.products
    }),
    searchFilter: function() {
      return this.products.filter(product => {
        return (
          product.purchased_date.match(this.search) ||
          product.serial_no.match(this.search) ||
          product.model_no.match(this.search)
        );
      });
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
    this.LoadProducts();
    setTimeout(() => {
      this.paginate();
    }, 500);
  },
  methods: {
    async LoadProducts() {
      this.$store.dispatch("ALL_PRODUCTS", this.$route.params.id);
    },
    async SingleProduct(id) {
      this.$router.push("/alcpg/view-single-product/" + id);
    },
    async ProductPreview(id) {
      var ids = {
        assetId: this.$route.params.id,
        productId: id
      };
      this.$store.dispatch("PREVIEW_PRODUCT", ids);
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;

        this.$router.push("/alcpg/snap-product/" + id);
      }, 500);
    },
    async DeletePreview(id) {
      var ids = {
        assetId: this.$route.params.id,
        productId: id
      };
      this.$store.dispatch("PREVIEW_PRODUCT", ids);
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.$router.push("/alcpg/delete-product/" + id);
      }, 500);
    },
    async paginate() {
      this.total_items = this.products.length;
      this.total_pages = Math.ceil(this.total_items / this.perPage);
      for (let i = 1; i <= this.total_pages; i++) {
        this.items_on_page.push(i * this.perPage);
      }
      this.lastPage = this.items_on_page.length;
      if (this.lastPage < 0) {
        this.lastPage = 1;
      }
      this.currentPage = 0;
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
    }
  }
};
</script>
