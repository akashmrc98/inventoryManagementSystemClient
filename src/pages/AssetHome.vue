<template lang="pug">
div.card.page.slideMeOpen
  .columns
    .column.is-4
     add-asset
    .column.is-8
     view-assets

</template>

<script>
import AddAsset from "../components/Asset/AddAsset";
import ViewAsset from "../components/Asset/ViewAsset";
export default {
  components: {
    "add-asset": AddAsset,
    "view-assets": ViewAsset
  }
};
</script>
