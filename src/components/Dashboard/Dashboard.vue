<template lang="pug">
.page
  center.box.component.slideMeOpen
    h2.componentHead.box DASHBORD
    .card-body
        .columns
            .column.is-3
                .card.box.dashs
                  router-link(to='/alcpg/all-assets')
                    v-icon.Item(name="toolbox", scale="6")
                    h2 Total Assets
                    h2 {{dashboard.total_assets}}
                   
            .column.is-3
                .card.box.dashs
                  router-link(to='/alcpg/view-accommodations')               
                    v-icon.Item(name="address-card", scale="6")
                    h2 Assets History
                    h2 {{dashboard.total_accommodations}}
            .column.is-3
                .card.box.dashs        
                  router-link(to='/alcpg/returned-assets')                          
                    v-icon.Item(name="exchange-alt", scale="6")
                    h2 Returned Assets 
                    h2 {{dashboard.returned_assets}}
            .column.is-3
                .card.box.dashs
                    router-link(to='/alcpg/unreturned-assets')
                      v-icon.Item(name="question-circle", scale="6")
                      h2 Assets In Use
                      h2 {{dashboard.pending_assets}}

        .columns
            
            .column.is-3
                .card.box.dashs
                  router-link(to='/alcpg/damaged-assets')   
                    v-icon.Item(name="house-damage", scale="6")
                    h2 Damged Assets
                    h2 {{dashboard.damaged_assets}}

            .column.is-3
                .card.box.dashs
                    v-icon.Item(name="clipboard", scale="6")
                    h2 Total Products
                    h2 {{dashboard.total_products}}
            .column.is-3
                .card.box.dashs
                    v-icon.Item(name="cog", scale="6" spin)
                    h2 Total Services
                    h2 {{dashboard.total_services}}

            .column.is-3
                .card.box.dashs
                    v-icon.Item(name="users", scale="6")
                    h2 Total Users
                    h2 {{dashboard.total_users}}
            
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      dashboard: state => state.Assets.dashboard
    })
  },
  mounted() {
    this.LoadDashboard();
  },
  methods: {
    async LoadDashboard() {
      this.$store.dispatch("DASHBOARD");
    }
  }
};
</script>
