<template lang="pug">
.modal.is-active.slideMeOpen
  .modal-background
    .modal-content
        center.box.component.modalpos
          h2.box.componentHead EDIT USER
          .card-body
            b-notification(title="Warning!" v-if="isSubmitted" :type="typeData" :class="isActive")
              p {{message.message}}
            b-notification(title="Warning!" v-if="isError" type="is-warning")
              p {{msg}}
            .columns
              .column 
                b-field(label="First Name")
                  b-input(
                    class="input"
                    placeholder="Enter Product" 
                    :class="{ 'hasError': $v.user.first_name.$error}"
                    v-model.lazy="$v.user.first_name.$model"
                    @blur="$v.user.first_name.$touch()"
                    )
                p(v-if="!$v.user.first_name.minLength" class="error") minimum  5 alpha characters
                p(v-if="!$v.user.first_name.maxLength" class="error") maximum  24 alpha characters
                p(v-if="!$v.user.first_name.alpha" class="error") only alpha characters
              .column
                b-field(label="Last Name")
                  b-input(
                    class="input"
                    placeholder="Enter Last Name"
                    :class="{ 'hasError': $v.user.last_name.$error}"
                    v-model.lazy="$v.user.last_name.$model"
                    @blur="$v.user.last_name.$touch()"
                    )
                p(v-if="!$v.user.last_name.minLength" class="error") minimum only 5 alpha characters
                p(v-if="!$v.user.last_name.maxLength" class="error") maximum  24 alpha characters
                p(v-if="!$v.user.first_name.alpha" class="error") only alpha characters
            .columns
              .column
                b-field(label="Gender")
                  select(
                    placeholder="Enter gender" 
                    class="input"
                    v-model="user.gender"          
                    )
                      option(value="male" selected) MALE
                      option(value="female") FEMALE
              .column
                b-field(label="User Type")
                  select(
                    placeholder="Enter gender" 
                    class="input"
                    v-model="user.isAdmin"
                    )
                      option(value="true") ADMIN
                      option(value="false" selected) STAFF
            .columns
              .column
                b-field(label="Mobile")
                  b-input(
                    class="input"
                    placeholder="Enter Mobile"
                    :class="{ 'hasError': $v.user.mobile.$error}"
                    v-model.lazy="$v.user.mobile.$model"
                    @blur="$v.user.mobile.$touch()"
                    )
                p(v-if="!$v.user.mobile.minLength" class="error") minimum 10 digits
                p(v-if="!$v.user.mobile.maxLength" class="error") maximum  12 digits
                p(v-if="!$v.user.mobile.integer" class="error") must be numeric
              .column
                b-field(label="Date of birth")
                  b-input(
                    class="input"
                    placeholder="Enter date of birth"
                    v-model="user.dob"
                    )
            .columns
              .column 
                b-field(label="User Name")
                  b-input(
                    class="input"
                    placeholder="Enter User Name" 
                    :class="{ 'hasError': $v.user.username.$error}"
                    v-model.lazy="$v.user.username.$model"
                    @blur="$v.user.username.$touch()"
                    )
                p(v-if="!$v.user.username.alphaNum" class="error") must be alpha numeric 
                p(v-if="!$v.user.username.minLength" class="error") minimum 8 characters required
               
              .column 
                b-field(label="Email")
                  b-input(
                    type="email"
                    class="input"
                    placeholder="Enter Email" 
                    :class="{ 'hasError': $v.user.email.$error}"
                      v-model.lazy="$v.user.email.$model"
                      @blur="$v.user.email.$touch()"
                    )
                p(v-if="!$v.user.email.email" class="error") invalid email, email format be like xyz@abc.com
            .columns
              .column
                b-field(label="Address")
                 b-input(type="textarea" maxlength="200" v-model="user.address" rows="2" class="inputArea" placeholder="Enter       Address")
            .columns  
              .column
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
import {
  required,
  maxLength,
  alpha,
  minLength,
  alphaNum,
  email,
  integer
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      isActive: "",
      msg: "",
      isSubmitted: false,
      isError: false,
      typeData: "",
      isLoading: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.User.user,
      message: state => state.User.message
    })
  },

  mounted() {
    this.LoadUser();
  },
  methods: {
    async LoadUser() {
      this.$store.dispatch("VIEW_USER", this.$route.params.id);
    },
    async Edit() {
      if (this.$v.$anyError) {
        this.isError = true;
        this.isActive = "slideMeDelete";
        this.typeData = "is-warning";
        this.msg = "Invalid form Data!";
        setTimeout(() => {
          this.isSubmitted = false;
          this.isError = false;
          this.typeData = "";
          this.msg = "";
          this.isActive = "slideMeDeleteClose";
        }, 2500);
      } else {
        var user = {
          user: this.user,
          id: this.$route.params.id
        };
        this.$store.dispatch("EDIT_USER", user);
        this.isLoading = true;
        setTimeout(() => {
          this.$store.dispatch("VIEW_USERS");
          this.isLoading = false;
          if (this.message.status === 400) {
            this.isSubmitted = true;
            this.isActive = "slideMeDelete";
            this.typeData = "is-warning";
          } else {
            this.isSubmitted = true;
            this.isActive = "slideMeDelete";
            this.typeData = "is-success";
          }
        }, 1000);
        this.isSubmitted = false;
        this.isError = false;
        this.typeData = "";
        this.msg = "";
        this.isActive = "slideMeDeleteClose";
      }
    },
    async Cancel() {
      window.history.back();
    }
  },
  validations: {
    user: {
      first_name: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(24),
        alpha
      },
      last_name: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(24),
        alpha
      },
      mobile: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(12),
        integer
      },
      username: {
        required,
        alphaNum,
        minLength: minLength(5),
        maxLength: maxLength(24)
      },
      email: {
        required,
        email
      }
    }
  }
};
</script>
