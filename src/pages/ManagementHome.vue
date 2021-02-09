<template lang="pug">
div.page.slideMeOpen
  .columns
    .column.is-12
     add-accommodate

</template>

<script>
import AddAccommodate from "../components/Management/AccommodateAsset";
export default {
  components: {
    "add-accommodate": AddAccommodate
  }
};
</script>
