<template lang="pug">
.modal.is-active.slideMeOpen
  .modal-background
    .modal-content.componentHead
      .button.closeButton(@click="RedirectAsset")
        v-icon.Item(name="times" scale="2") 
      .card.component.box            
        .columns
          .column.is-4
           add-services
          .column.is-8
           view-services

</template>

<script>
import AddServices from "../components/Services/AddService";
import ViewServicess from "../components/Services/ViewServices";
export default {
  components: {
    "add-services": AddServices,
    "view-services": ViewServicess
  },
  methods: {
    RedirectAsset() {
      window.history.back();
    }
  }
};
</script>
