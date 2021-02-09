<template lang="pug">
div
  .modal.is-active
    .modal-background
      .modal-content
        .modalpos.box.component(:class="close")            
              center
                h2.box.componentHead RETURN ASSET
                b-notification.box(title="Success!" v-if="err" type="is-warning")
                  p {{error}}
                .card-body
                b-field(label='Returned on')
                  b-datepicker( placeholder='Click to select...' v-model="Return.return_on" class="input")

                b-field(label="Remarks")
                  b-input(type="textarea" maxlength="200" rows="2" class="inputArea" v-model="Return.remarks" placeholder="Enter Remarks")

                b-field(label="Notes")
                  b-input(type="textarea" maxlength="200" rows="2" class="inputArea" v-model="Return.notes" placeholder="Enter Notes")
                b-field(label="Comments")
                  b-input(type="textarea" maxlength="200" rows="2" class="inputArea" v-model="Return.comments"  placeholder="Enter Comments")
                center 
                  b-field(label="Condition")
                    select.input(placeholder="Select Condition" v-model="Return.condition")  
                      option(value="Good") Good
                      option(value="Damaged") Damaged

                .button.is-warning.card.buttonmt(@click.prevent="postCheck")
                  v-icon.Item(name="edit")
                  | Return Product 
                .button.is-success.Item.card.buttonmt(@click.prevent="Cancel")
                  v-icon.Item(name="times")
                  | Cancel
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isSubmitted: false,
      close: "slideMeDelete",
      err: false,
      error: "",
      Return: {
        return_on: null,
        remarks: null,
        comments: null,
        notes: null,
        condition: "Good"
      }
    };
  },
  computed: {
    ...mapState({
      message: state => state.Management.message
    })
  },

  methods: {
    async postCheck() {
      var Asset = {
        AssetInfo: this.Return,
        tokenId: this.$route.params.id
      };
      if (
        this.Return.return_on != null &&
        this.Return.comments != null &&
        this.Return.remarks != null &&
        this.Return.notes != null
      ) {
        this.$store.dispatch("RETURN_ASSET", Asset);
        this.$store.dispatch("ALL_ASSETS");
        this.Cancel();
      } else {
        this.err = true;
        this.error = "Fill up all the Fields";
        setTimeout(() => {
          this.err = false;
          this.error = "";
        }, 3500);
      }
    },

    async Cancel() {
      this.close = "slideMeDeleteClose";
      setTimeout(() => {
        var self = this;
        self.close = "";
        this.$router.push("/alcpg/View-Accommodations/");
      }, 500);
    }
  }
};
</script>
