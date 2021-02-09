<template lang="pug">
.box.component.card 
  b-notification(title="Success!" show v-if="isSubmitted"  type="is-success" aria-close-label="Close message")
    p {{message}}
  b-notification(title="Warning!" show v-if="isError"  type="is-warning" aria-close-label="Close message" :class="close")
    p {{error}}
  center 
    h2.box.componentHead ADD NEW SERVICE
    .card-body
    b-field(label='Serviced by')
        b-input(v-model="Service.serviced_by" placeholder='Enter Serviced by' class="input")

    b-field(label='Serviced on')
        b-datepicker(v-model="Service.serviced_on" placeholder='Enter Serviced on', class="input")

    b-field(label='Mobile')
        b-input(v-model="Service.service_no" placeholder='Enter Mobile', class="input")

    b-field(label="Address")
           b-input(type="textarea" maxlength="200" rows="2"  class="inputArea" v-model="Service.address" placeholder="Enter Address")

    b-field(label="Notes")
           b-input(type="textarea" maxlength="200" rows="2"  class="inputArea" v-model="Service.notes" placeholder="Enter Notes")
       
    b-field(label="Cost")
        b-input(
              class="input"
              v-model="Service.cost"
              placeholder="enter unit price"
              type="number"
              required
              )
    .button.is-dark.card.buttonmt(@click.prevent="postCheck")
      v-icon.Item(name="plus")
      | Add Service
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      Service: {
        serviced_by: null,
        service_on: null,
        service_no: "",
        address: "",
        notes: "",
        cost: "",
        id: this.$route.params.id
      },
      isSubmitted: false,
      close: "",
      isError: false,
      error: ""
    };
  },
  computed: {
    ...mapState({
      message: state => state.Assets.message,
      services: state => state.Assets.services
    })
  },

  methods: {
    postCheck() {
      if (
        this.Service.serviced_by != null &&
        this.Service.serviced_on != null
      ) {
        this.isSubmitted = true;
        this.$store.dispatch("ADD_SERVICE", this.Service);
        this.close = "slideMe";
        this.refreshPage();
      } else {
        this.isError = true;
        this.error = "Fill Up Empty Fields";
        setTimeout(() => {
          this.isError = false;
          this.error = "";
        }, 2500);
      }
    },
    refreshPage() {
      setTimeout(() => {
        this.$store.dispatch("VIEW_SERVICES", this.$route.params.id);
        var self = this;
        this.close = "";
        self.isSubmitted = false;
        self.Service = {
          serviced_by: null,
          service_on: null,
          service_no: "",
          address: "",
          notes: "",
          cost: "",
          id: this.$route.params.id
        };
      }, 3500);
    }
  }
};
</script>
