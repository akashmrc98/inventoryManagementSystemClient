<template lang="pug">
.page
  center.box.component.slideMeOpen
    h2.componentHead.box EXTRAS
    .card-body
        .columns
            .column.is-3
                .card.box.dashs
                 a.extras(@click="LOAD_ASSETS")
                    v-icon.Item(name="file-csv", scale="6")
                    h2 Total Assets
                    h2 {{dashboard.total_assets}}
          
                   
            .column.is-3
                .card.box.dashs
                  a.extras(@click="LOAD_MANAGEMENTS")
                    v-icon.Item(name="file-csv", scale="6")
                    h2 Total Accommodations
                    h2 {{dashboard.total_accommodations}}
            .column.is-3
                .card.box.dashs
                  a.extras(@click="LOAD_RECYCLES")
                    v-icon.Item(name="file-csv", scale="6")
                    h2 Deleted Assets
            .column.is-3
                .card.box.dashs
                  a.extras(@click="LOAD_USERS")
                    v-icon.Item(name="file-csv", scale="6")
                    h2 Total Users
            
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
    this.LOAD_CSVS();
  },
  methods: {
    async LoadDashboard() {
      this.$store.dispatch("DASHBOARD");
    },
    async LOAD_CSVS() {
      this.$store.dispatch("LOAD_CSVS");
    },
    async LOAD_ASSETS() {
      this.$store.dispatch("LOAD_ASSETS_CSV");
    },
    async LOAD_MANAGEMENTS() {
      this.$store.dispatch("LOAD_MANAGEMENTS_CSV");
    },
    async LOAD_RECYCLES() {
      this.$store.dispatch("LOAD_RECYCLES_CSV");
    },
    async LOAD_USERS() {
      this.$store.dispatch("LOAD_USERS_CSV");
    }
  }
};
</script>
