<template lang="pug">
div.box.component
  h2.box.componentHead USERS
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
     table.table.is-hoverable.is-fullwidth.is-bordered.is-narrow
       thead
         tr
           th First Name
           th Last Name
           th Email
           th Username 
           th Mobile
           th Options
       tbody
         tr(v-for="(user,index) in perPagefunc" :key="index") 
           td {{user.first_name}}
           td {{user.last_name}}
           td {{user.email}}
           td {{user.username}}
           td {{user.mobile}}
           td
            .button.has-background-success.has-text-white-ter(@click="RedirectSingleView(user._id)")
              v-icon.Item(name="th-list")
              | View
            .button.has-background-secondary.has-text-dark-ter(@click="RedirectTrash(user.username)")
              v-icon.Item(name="trash")
              | Trash
            .button.has-background-warning.has-text-dark-ter(@click="RedirectEdit(user._id)")
              v-icon.Item(name="edit")
              | Edit
            .button.has-background-danger.has-text-white-ter(@click="RedirectDelete(user._id)")
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
      users: state => state.User.users
    }),
    searchFilter: {
      get: function() {
        return this.users.filter(user => {
          return (
            user.first_name.match(this.search) ||
            user.last_name.match(this.search) ||
            user.email.match(this.search) ||
            user.username.match(this.search) ||
            user.gender.match(this.search) ||
            user.mobile.match(this.search)
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
      this.lastPage = 1;
      this.paginate();
    }
  },

  mounted() {
    this.LoadUsers();
    setTimeout(() => {
      this.paginate();
    }, 500);
  },

  methods: {
    async paginate() {
      this.total_items = this.users.length;
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
    async LoadUsers() {
      this.$store.dispatch("VIEW_USERS");
    },
    async RedirectSingleView(id) {
      this.isLoading = true;
      this.close = "slideMeCloseDelete";
      setTimeout(() => {
        this.isLoading = false;
        this.close = "";
        this.$router.push("/alcpg/view-user/" + id);
      }, 500);
    },
    async RedirectEdit(id) {
      this.isLoading = true;
      this.close = "slideMeCloseDelete";
      setTimeout(() => {
        this.isLoading = false;
        this.close = "";
        this.$router.push("/alcpg/edit-user/" + id);
      }, 500);
    },
    async RedirectDelete(id) {
      this.isLoading = true;
      this.close = "slideMeCloseDelete";
      setTimeout(() => {
        this.isLoading = false;
        this.close = "";
        this.$router.push("/alcpg/delete-user/" + id);
      }, 500);
    },
    async RedirectTrash(id) {
      this.$router.push("/alcpg/trash/" + id);
    }
  }
};
</script>
