<template lang="pug">
.box.page
  center
    .card-body
        .columns
          .column.is-3.component
            h2.box.componentHead ACCOMMODATE USER
            .notification.is-warning.input.navItem(v-if="showError")
              p {{error}}
            b-field(label='Accommodated on')
             b-datepicker(placeholder='Accommodated on', class="input" v-model="User.bought_on")    
            b-field(label="Incharge")
              b-input(
                class="input"
                placeholder="Incharge" 
                required
                v-model="User.in_charge"
                )
            b-field(label="Mobile")
              b-input(
                class="input"
                placeholder="Mobile"
                required
                v-model="User.in_charge_no"
                )
            b-field(label="Purpose")
              b-input(type="textarea" maxlength="200" rows="4" class="inputArea" v-model="User.purpose" placeholder="Purpose")      

          .column.is-5.component
            h2.box.componentHead SELECT ASSETS
            .columns
              .column.is-4
                b-input.input.searchInput(v-model="search" placeholder="Search...?")
              .column.is-2
                  b-select(name="" v-model="perPage" placeholder="Select cells..!")
                      option.input(value="5") 5 cells
                      option.input(value="10") 10 cells
                      option.input(value="15") 15 cells
              .column.is-3
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
                    th
                    th ID
                    th Product 
                    th Category
                    th Vendor
                    th Stock
                tbody
                  b-loading(:active.sync='isLoading' :is-full-page='isFullPage' :can-cancel='true')
                    v-icon(name="sync" scale="6" spin) 
                  tr(v-for="(asset,index) in perPagefunc" :key="index")                                       
                    td 
                      b-checkbox(v-model="Checked" type="is-dark" size="is-small" :native-value='asset.asset_id')
                    td {{asset.asset_id}}
                    td {{asset.product_name}}
                    td {{asset.category}}
                    td {{asset.vendor}}
                    td {{asset.product_quantity}}                        
          .column.component.slideMeOpen       
            h2.box.componentHead SELECT STOCK     
            b-notification(v-if="isSubmitted").componentHead {{token}}
            .table-container
              table.table.is-hoverable.is-fullwidth.is-bordered.is-narrow                
                thead
                  tr
                    th ID
                    th Stock required 
                tbody
                  tr(v-for="(asset,index) in Checked" :key="index")     
                    td {{asset}}              
                    td                             
                      b-input(
                        class="input" 
                        :name="stock[index]"
                        v-model="stock[index]"
                        )
            .button.is-success.card.buttonmt(@click.prevent="ConfirmOrder")
              v-icon.Item(name="check-square")
              | Confirm Order  
    
                            
                                    
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      User: {
        bought_on: null,
        in_charge: null,
        in_charge_no: null,
        purpose: null
      },
      Checked: [],
      stock: [],
      search: "",
      perPage: 5,
      isLoading: false,
      isFullPage: false,
      error: "",
      showError: false,
      isSubmitted: false,
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
      assets: state => state.Assets.assets,
      token: state => state.Management.token
    }),
    searchFilter: function() {
      return this.assets.filter(product => {
        return (
          product.asset_id.match(this.search) ||
          product.product_name.match(this.search) ||
          product.category.match(this.search) ||
          product.vendor.match(this.search)
        );
      });
    },
    perPagefunc: {
      get: function() {
        return this.searchFilter.slice(this.f_item, this.l_item);
      }
    }
  },

  mounted() {
    this.$store.commit("CLEAR_TOKEN");
    this.LoadAssets();
    setTimeout(() => {
      this.paginate();
    }, 500);
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
  methods: {
    async LoadAssets() {
      this.$store.dispatch("ALL_ASSETS");
    },

    async ConfirmOrder() {
      if (
        this.User.bought_on != null &&
        this.User.in_charge != null &&
        this.User.in_charge_no != null &&
        this.User.purpose != null
      ) {
        if (this.Checked.length > 0 && this.stock.length > 0) {
          this.isLoading = true;
          var data = {
            Deducted: {
              checked: this.Checked,
              stock: this.stock,
              user: this.User
            }
          };
          this.$store.dispatch("ADD_USER", data);
          setTimeout(() => {
            this.User = {
              bought_on: null,
              in_charge: null,
              in_charge_no: null,
              purpose: null
            };
            this.Checked = [];
            this.stock = [];
            this.isLoading = false;
            this.isSubmitted = true;
            setTimeout(() => {
              this.$store.commit("CLEAR_TOKEN");
              this.LoadAssets();
              this.isSubmitted = false;
            }, 2500);
          }, 500);
        } else {
          this.showError = true;
          this.error = "Select Asset and Stock Needed";
          setTimeout(() => {
            this.error = "";
            this.showError = false;
          }, 1500);
        }
      } else {
        this.showError = true;
        this.error = "Fill the empty Fields";
        setTimeout(() => {
          this.error = "";
          this.showError = false;
        }, 1500);
      }
    },
    async paginate() {
      this.total_items = this.assets.length;
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
