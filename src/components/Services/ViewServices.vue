<template lang="pug">
div.box.component
 center
  b-loading(:is-full-page='isFullPage', :active.sync='isLoading', :can-cancel='true')
   v-icon(name="sync" scale="5" spin)
  h2.box.componentHead SERVICES
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
      .column.is-4
      .column
        a.is-dark(@click="prevPageController")
          v-icon.Item(name="caret-square-left" scale="3")   
        a.is-dark(@click="nextPageController")  
          v-icon.Item(name="caret-square-right" scale="3") 
        p {{currentPage+1}}/{{lastPage}} 
    .table-container
     table.table.is-hoverable.is-fullwidth.is-bordered.is-narrow
       thead
         tr
           th Service Id
           th Serviced On
           th Serviced By
           th Cost
           th Options
       tbody
         tr(v-for="product in perPagefunc") 
           td {{product.service_id}}
           td {{product.serviced_on}}
           td {{product.serviced_by}}
           td {{product.cost}} ₹
           td
              .button.has-background-success.has-text-white-ter(@click="View(product._id)")
                v-icon.Item(name="th-list")
                | View                  
              .button.has-background-warning.has-text-dark-ter(@click="Edit(product._id)")
                v-icon.Item(name="edit")
                | Edit
              .button.has-background-danger.has-text-white-ter(@click="Delete(product._id)")
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
      services: state => state.Assets.services
    }),
    searchFilter: function() {
      return this.services.filter(product => {
        return (
          product.serviced_by.match(this.search) ||
          product.serviced_on.match(this.search) ||
          product.service_no.match(this.search) ||
          product.address.match(this.search)
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
      this.lastPage = 1;
      this.paginate();
    }
  },
  mounted() {
    this.LoadServiecs();
    setTimeout(() => {
      this.paginate();
    }, 500);
  },
  methods: {
    async LoadServiecs() {
      this.$store.dispatch("VIEW_SERVICES", this.$route.params.id);
    },
    async View(id) {
      this.$router.push("/alcpg/view-single-service/" + id);
    },
    async Edit(id) {
      var ids = {
        assetId: this.$route.params.id,
        serviceId: id
      };
      this.$store.dispatch("PREVIEW_SERVICE", ids);
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.$router.push("/alcpg/edit-service/" + id);
      }, 500);
    },
    async Delete(id) {
      var ids = {
        assetId: this.$route.params.id,
        serviceId: id
      };
      this.$store.dispatch("PREVIEW_SERVICE", ids);
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.$router.push("/alcpg/delete-service/" + id);
      }, 500);
    },
    async paginate() {
      this.total_items = this.services.length;
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
    }
  }
};
</script>
