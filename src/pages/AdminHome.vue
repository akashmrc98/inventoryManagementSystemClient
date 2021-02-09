<template lang="pug">
div.card.page.slideMeOpen
  .columns
    .column.is-4
     add-user
    .column.is-8
     view-users

</template>

<script>
import AddUser from "../components/User/AddUser";
import ViewUsers from "../components/User/ViewUsers";
export default {
  components: {
    "add-user": AddUser,
    "view-users": ViewUsers
  }
};
</script>
