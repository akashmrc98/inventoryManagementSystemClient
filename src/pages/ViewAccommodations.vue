<template lang="pug">
div.page.box.slideMeOpen
  .columns
    .column.component.box
      center(:class="close")
       b-loading(:active.sync='isLoading', :can-cancel='true')
         v-icon(name="sync" scale="6" spin)
       h2.box.componentHead ACCOMMODATIONS
       .card-body
         .columns
           .column.is-2
             b-input.input.searchInput(v-model="search" placeholder="Search...?")
           .column.is-1
               b-select(name="" v-model="perPage" placeholder="Select cells..!")
                   option.input(value="5") 5 cells
                   option.input(value="10") 10 cells
                   option.input(value="15") 15 cells
                   option(value="20") 20 cells
                   option(value="25") 25 cells
           .column.is-7
           .column.is-2
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
                th Incharge 
                th Mobile
                th Purpose
                th Options
            tbody
              tr(v-for="(asset,index) in perPagefunc" :key="index") 
                td {{asset.ticket_no}}
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
                  .button.has-background-info.has-text-white-ter(@click.prevent="Print(asset._id)") 
                    v-icon.Item(name="file-pdf")
                    | pdf

</template>

<script>
import { mapState } from "vuex";
import jsPDF from "jspdf";
export default {
  data() {
    return {
      perPage: 15,
      search: "",
      isLoading: false,
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
      accommodations: state => state.Management.accommodations,
      accommodation: state => state.Management.accommodation
    }),
    searchFilter: {
      get: function() {
        return this.accommodations.filter(product => {
          return (
            product.ticket_no.match(this.search) ||
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
      this.lastPage = 1;
      this.paginate();
    }
  },

  mounted() {
    this.LoadAccommodations();
    setTimeout(() => {
      this.paginate();
    }, 500);
  },

  methods: {
    async Print(id) {
      this.$store.dispatch("SINGLE_ACCOMMODATION_VIEW", id);
      setTimeout(() => {
        if (this.accommodation) {
          const doc = new jsPDF();
          doc.setFontSize(24);
          doc.setTextColor(0, 255, 55);
          doc.text("PGALC ACCOMMODATION TOKEN", 40, 20);
          doc.setLineWidth(1.2);
          doc.line(0, 35, 250, 35);
          doc.line(40, 35, 40, 78);
          doc.setDrawColor(0, 0, 0);
          doc.setTextColor(0, 0, 0);

          doc.setFontSize(16);
          doc.text(`Ticket`, 10, 45);
          doc.text(`${this.accommodation.ticket_no}`, 50, 45);
          doc.line(0, 48, 250, 48);
          doc.setLineWidth(1.2);
          doc.text(`Incharge`, 10, 55);
          doc.text(`${this.accommodation.in_charge}`, 50, 55);
          doc.line(0, 58, 250, 58);
          doc.setLineWidth(1.2);
          doc.text(`Contact`, 10, 65);
          doc.text(`${this.accommodation.in_charge_no}`, 50, 65);
          doc.line(0, 68, 250, 68);
          doc.setLineWidth(1.2);
          doc.text(`Purpose`, 10, 75);
          doc.text(`${this.accommodation.purpose}`, 50, 75);
          doc.line(0, 78, 250, 78);
          doc.setLineWidth(1.2);

          doc.text(`Issuer Sign`, 10, 98);
          doc.text(`Incharge Sign`, 165, 98);

          var now = new Date();
          doc.text(`Date:${now}`, 10, 108);

          doc.setFontSize(20);
          doc.setTextColor(55, 25, 15);
          doc.text("ASSETS RECIEVED", 65, 118);
          doc.line(0, 120, 250, 120);
          doc.setFontSize(16);
          doc.setTextColor(0, 0, 0);
          doc.text("ID / STOCK / NAME", 10, 130);
          var products = this.accommodation.products;
          var y = 130;
          for (let i = 1; i < products.length + 1; i++) {
            doc.text(
              `${products[i - 1].product_id} / ${products[i - 1].stock} / ${
                products[i - 1].product_name
              }`,
              10,
              y + i * 10
            );
          }

          doc.save(`user${id}.pdf`);
        }
      }, 2000);
    },
    async LoadAccommodations() {
      this.$store.dispatch("VIEW_ACCOMMODATIONS");
    },
    async RedirectView(id) {
      this.$router.push("/alcpg/view-accommodation/" + id);
    },
    async RedirectEdit(id) {
      this.$router.push("/alcpg/edit-accommodation/" + id);
    },

    async paginate() {
      this.total_items = this.accommodations.length;
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
