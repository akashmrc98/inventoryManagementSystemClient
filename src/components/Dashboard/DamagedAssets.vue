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
          .column.is-7
          .column.is-3
            a.is-dark(@click="prevPageController")
              v-icon.Item(name="caret-square-left" scale="3")   
            a.is-dark(@click="nextPageController")  
              v-icon.Item(name="caret-square-right" scale="3") 
            p {{f_item}}-{{l_item}} /  {{total_items}}
        .table-container
         table.table.is-hoverable.is-fullwidth.is-bordered.is-narrow
           thead
             tr
               th Ticket no 
               th bought_on 
               th in_charge
               th in_charge_no
               th purpose
               th Options
           tbody
             tr(v-for="(asset,index) in perPagefunc" :key="index") 
               td {{asset.ticket_no}} 
               td {{asset.bought_on}}
               td {{asset.in_charge}}
               td {{asset.in_charge_no}}
               td {{asset.purpose}}        
               td
                 .button.has-background-success.has-text-white-ter(@click.prevent="RedirectView(asset._id)") 
                   v-icon.Item(name="th-list")
                   | View

                 .button.has-background-warning.has-text-dark-ter(@click.prevent="RedirectEdit(asset._id)")
                   v-icon.Item(name="edit")
                   | Edit


                  
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
      total_items: 0
    };
  },
  computed: {
    ...mapState({
      DamagedAssets: state => state.Assets.DamagedAssets
    }),
    searchFilter: {
      get: function() {
        return this.DamagedAssets.filter(product => {
          return (
            product.ticket_no.match(this.search) ||
            product.bought_on.match(this.search) ||
            product.in_charge.match(this.search) ||
            product.in_charge_no.match(this.search) ||
            product.purpose.match(this.search)
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
    }, 500);
  },

  methods: {
    async LoadPosts() {
      this.$store.dispatch("DAMAGED_ASSETS");
    },

    async paginate() {
      this.total_items = this.DamagedAssets.length;
      this.total_pages = Math.ceil(this.total_items / this.perPage);
      for (let i = 1; i <= this.total_pages; i++) {
        this.items_on_page.push(i * this.perPage);
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
    },

    async RedirectView(id) {
      this.$router.push("/alcpg/View-Accommodation/" + id);
    },
    async RedirectEdit(id) {
      this.$router.push("/alcpg/Edit-Accommodation/" + id);
    }
  }
};
</script>
