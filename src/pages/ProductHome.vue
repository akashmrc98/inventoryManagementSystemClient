<template lang="pug">
div.slideMeOpen
  .columns
    .column.is-4
     add-product
    .column.is-8
     view-product

</template>

<script>
import AddProduct from "../components/Products/AddProduct";
import ViewProduct from "../components/Products/ViewProduct";
export default {
  components: {
    "add-product": AddProduct,
    "view-product": ViewProduct
  }
};
</script>
