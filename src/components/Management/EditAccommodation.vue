<template lang="pug">
.modal.is-active.slideMeOpen
  .modal-background
    .modal-content
        center.box.component.modalpos
          h2.box.componentHead EDIT ACCOMMODATION
          .card-body
              b-notification(title="Warning!" v-if="isUpdated"  type="is-warning" aria-close-label="Close message")
                p {{message}}  
          .columns
            .column.is-6
              b-field(label='Accommodated on')
               b-input(placeholder='Accommodated on', class="input" v-model="accommodation.bought_on")    
              b-field(label="Incharge")
                b-input(
                  class="input"
                  placeholder="Incharge" 
                  required
                  v-model="accommodation.in_charge"
                  )
              b-field(label="Mobile")
                b-input(
                  class="input"
                  placeholder="Mobile"
                  required
                  v-model="accommodation.in_charge_no"
                  )
              b-field(label='Returned on')
                  b-input( placeholder='Click to select...' v-model="accommodation.return_on" class="input")
                  
              center 
                b-field(label="Condition")
                  select.input(placeholder="Select Condition" v-model="accommodation.condition")  
                    option(value="Good") Good
                    option(value="Damaged") Damaged  

            .column.is-6
              b-field(label="Remarks")
                b-input(type="textarea" maxlength="200" rows="2" class="inputArea" v-model="accommodation.remarks" placeholder="Enter Remarks")  
              b-field(label="Notes")
                b-input(type="textarea" maxlength="200" rows="2" class="inputArea" v-model="accommodation.notes" placeholder="Enter Notes")
              b-field(label="Comments")
                b-input(type="textarea" maxlength="200" rows="2" class="inputArea" v-model="accommodation.comments"  placeholder="Enter Comments")

              b-field(label="Purpose")
                b-input(type="textarea" maxlength="200" rows="2" class="inputArea" v-model="accommodation.purpose" placeholder="Purpose")
          center
           .button.is-warning.card.buttonmt(@click.prevent="Edit")
             v-icon.Item(name="edit")
             | Edit  
           .button.is-success.card.buttonmt(@click.prevent="Cancel")
             v-icon.Item(name="edit")
             | Cancel  
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isLoading: false,
      isFullPage: false,
      isActive: "active",
      message: "",
      isUpdated: false
    };
  },
  computed: {
    ...mapState({
      accommodation: state => state.Management.accommodation
    })
  },

  mounted() {
    this.LoadAccommodation();
  },

  methods: {
    async LoadAccommodation() {
      this.$store.dispatch("SINGLE_ACCOMMODATION_VIEW", this.$route.params.id);
    },
    async Edit() {
      var accommodation = {
        Id: this.$route.params.id,
        accommodation: this.accommodation
      };
      this.$store.dispatch("EDIT_ACCOMMODATION", accommodation);
      this.isUpdated = true;
      this.message = "Accommodation Updated!";
      setTimeout(() => {
        this.isUpdated = false;
        this.message = "";
        this.$router.push("/alcpg/view-accommodations");
      }, 1500);
    },
    async Cancel() {
      this.$router.push("/alcpg/view-accommodations");
    }
  }
};
</script>
