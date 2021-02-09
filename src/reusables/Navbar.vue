<template lang="pug">  
 div 
  .navbar.navs.is-dark
    .navbar-brand
      a.navbar-item.navItem.is-dark(href="https://www.andhraloyolacollege.ac.in/" target="_blank") 
        img.logo2
    #navbarBasicExample.navbar-menu
      .navbar-start
        router-link.navbar-item.navItem(to='/alcpg/dashboard' )
          v-icon(name="chart-bar" scale="1.5").Item
          | Dashboard        
        .navbar-item.has-dropdown.is-hoverable
          a.navbar-link.navItem
            v-icon(name="toolbox" scale="1.5").Item
            | Assets
          .navbar-dropdown.d-drop-v
            router-link.navbar-item.d-drop(to='/alcpg/assets' )
              | Add Assets
            router-link.navbar-item.d-drop(to='/alcpg/all-assets' )
              | View Assets
        .navbar-item.has-dropdown.is-hoverable
          a.navbar-link.navItem
            v-icon(name="book" scale="1.5").Item
            | Management
          .navbar-dropdown.d-drop-v
            router-link.navbar-item.d-drop(to='/alcpg/accommodate' )
              | Accommodate Assets
            router-link.navbar-item.d-drop(to='/alcpg/view-accommodations'  )
              | View Accommodations             
    .navbar-end
        router-link.navbar-item.navItem(to='/alcpg/admin' v-if="isAdmin")
          v-icon(name="user-shield" scale="1.5").Item
          | Admin
        router-link.navbar-item.navItem(to='/alcpg/extras' v-if="isAdmin")
          v-icon(name="store" scale="1.5").Item
          | Extras 
        a.navbar-item.navItem(@click="logout")
          v-icon(name="lock" scale="1.5").Item
          | Logout

</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isAdmin: false,
      name: "",
      showUser: false
    };
  },
  created() {
    this.HideAdmin();
  },
  computed: {
    ...mapGetters(["token"])
  },
  methods: {
    async logout() {
      this.$store.dispatch("LOGOUT_USER");
      localStorage.removeItem("user");
      this.isAdmin = false;
      this.name = "";
      this.showUser = false;
      location.reload();
    },
    async HideAdmin() {
      if (this.token) {
        this.showUser = true;
        this.isAdmin = this.token.sign.isAdmin;
        this.name = this.token.sign.username;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.navs {
  background-color: #142850;
  box-shadow: 2px 2px 15px black;
  padding: 15px;
  font-size: 1.1em;
  text-align: center;
  font-weight: bold;
  color: #142850;
}

.navItem {
  margin: 8px;
  border-radius: 10px;
  background-color: #142850;
  color: #142850;
}

.pwel {
  color: #a0ffe6;
  font-size: 1em;
  margin-right: 15%;
}
.d-drop-v {
  border-radius: 15px;
  background: #a0ffe6;
  border: 2px solid #142850;
}
.d-drop {
  border-radius: 15px;
  border: 2px solid #142850;
  background: #142850;
  margin: 5px;
  color: #a0ffe6;
}
.logo2 {
  text-align: center;
  content: url(ALC.png);
}
.logo2:hover {
  animation-name: logoMover2;
  animation-duration: 0.5s;
}
@keyframes logoMover2 {
  50% {
    transform: scale(1.5);
  }
}
</style>
