<template lang="pug">
div.box.component.slideMeOpen
  h2.box.componentHead DELETED ASSETS 
  .card-body
    .columns
      .column.is-4
        b-input.input(v-model="search" placeholder="Search....!")
      .column.is-6
        b-select(name="" v-model="perPage" placeholder="Select cells..!")
          option(value="5") 5 cells
          option(value="10") 10 cells
          option(value="15") 15 cells
          option(value="20") 20 cells
          option(value="25") 25 cells
      .column.is-3
        a.is-dark(@click="prevPageController")
          v-icon.Item(name="caret-square-left" scale="3")   
        a.is-dark(@click="nextPageController")  
          v-icon.Item(name="caret-square-right" scale="3") 
          p {{currentPage+1}}/{{lastPage}}
    .table-container
     h2.componentHead.card {{message}}
     table.table.is-hoverable.is-fullwidth.is-bordered.is-narrow
       thead
         tr
           th ID
           th Product
           th Category 
           th vendor
           th contact
           th Price
           th Stock 
           th Deleted At
           th Options
       tbody
         tr(v-for="(user,index) in perPagefunc" :key="index") 
           td {{user.asset_id}}
           td {{user.product_name}}
           td {{user.category}}
           td {{user.vendor}}
           td {{user.vendor_contact_no}}
           td {{user.total_price}}
           td {{user.product_quantity}}
           td {{user.time_stamp}}
           td
            .button.has-background-warning.has-text-black-ter(@click="Restore(user._id)")
              v-icon.Item(name="trash-alt")
              | Restore

                  
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
      deleted: [],
      lastPage: 0,
      message: ""
    };
  },
  computed: {
    ...mapState({
      trash: state => state.User.trash
    }),
    searchFilter: {
      get: function() {
        return this.deleted.filter(user => {
          return user;
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
      this.lastPage = 0;
      this.paginate();
    }
  },

  mounted() {
    this.LoadUsers();
    setTimeout(() => {
      this.Trasher();
      this.paginate();
    }, 500);
  },

  methods: {
    async paginate() {
      this.total_items = this.deleted.length;
      this.total_pages = Math.ceil(this.total_items / this.perPage);
      for (let i = 1; i <= this.total_pages; i++) {
        this.items_on_page.push(i * this.perPage);
      }
      this.lastPage = this.items_on_page.length;
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
    async LoadUsers() {
      this.$store.dispatch("TRASH");
    },
    async RedirectSingleView(id) {
      setTimeout(() => {
        this.$router.push("/alcpg/view-user/" + id);
      }, 500);
    },
    async RedirectEdit(id) {
      setTimeout(() => {
        this.$router.push("/alcpg/edit-user/" + id);
      }, 500);
    },
    async RedirectDelete(id) {
      setTimeout(() => {
        this.$router.push("/alcpg/delete-user/" + id);
      }, 500);
    },
    async Restore(id) {
      var restore = this.deleted.filter(res => {
        return res._id == id;
      });
      restore = { restore: restore, id: this.$route.params.id };
      this.$store.dispatch("RESTORE_ASSET", restore);
      this.message = "Asset Restored!";
      this.LoadUsers();
      setTimeout(() => {
        this.message = "";
      }, 1500);
      location.reload();
    },
    async Trasher() {
      var id = this.$route.params.id;
      var trashCopy = this.trash;
      trashCopy = trashCopy.filter(res => {
        return res.username == id;
      });
      if (trashCopy.length > 0) {
        trashCopy = trashCopy[0];
        this.deleted = trashCopy.Assets;
      } else {
        this.deleted = [];
      }
    }
  }
};
</script>
