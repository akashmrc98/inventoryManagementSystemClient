<template lang="pug">
.box.component
  center
    h2.box.componentHead ADD NEW USER
    b-loading(:active.sync='isLoading')
     v-icon(name="sync" scale="6" spin)
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
              :class="{ 'hasError': $v.User.first_name.$error}"
              v-model.lazy="$v.User.first_name.$model"
              @blur="$v.User.first_name.$touch()"
              )
          p(v-if="!$v.User.first_name.minLength" class="error") minimum  5 alpha characters
          p(v-if="!$v.User.first_name.maxLength" class="error") maximum  24 alpha characters
          p(v-if="!$v.User.first_name.alpha" class="error") only alpha characters
        .column
          b-field(label="Last Name")
            b-input(
              class="input"
              placeholder="Enter Last Name"
              :class="{ 'hasError': $v.User.last_name.$error}"
              v-model.lazy="$v.User.last_name.$model"
              @blur="$v.User.last_name.$touch()"
              )
          p(v-if="!$v.User.last_name.minLength" class="error") minimum only 5 alpha characters
          p(v-if="!$v.User.last_name.maxLength" class="error") maximum  24 alpha characters
          p(v-if="!$v.User.first_name.alpha" class="error") only alpha characters
      .columns
        .column
          b-field(label="Gender")
            select(
              placeholder="Enter gender" 
              class="input"
              v-model="User.gender"          
              )
                option(value="male" selected) MALE
                option(value="female") FEMALE
        .column
          b-field(label="User Type")
            select(
              placeholder="Enter gender" 
              class="input"
              v-model="User.isAdmin"
              )
                option(value="true") ADMIN
                option(value="false" selected) STAFF
      .columns
        .column
          b-field(label="Mobile")
            b-input(
              class="input"
              placeholder="Enter Mobile"
              :class="{ 'hasError': $v.User.mobile.$error}"
              v-model.lazy="$v.User.mobile.$model"
              @blur="$v.User.mobile.$touch()"
              )
          p(v-if="!$v.User.mobile.minLength" class="error") minimum 10 digits
          p(v-if="!$v.User.mobile.maxLength" class="error") maximum  12 digits
          p(v-if="!$v.User.mobile.integer" class="error") must be numeric
        .column
          b-field(label="Date of birth")
            b-datepicker(
              class="input"
              placeholder="Enter date of birth"
              v-model="User.dob"
              )
      .columns
        .column 
          b-field(label="User Name")
            b-input(
              class="input"
              placeholder="Enter User Name" 
              :class="{ 'hasError': $v.User.username.$error}"
              v-model.lazy="$v.User.username.$model"
              @blur="$v.User.username.$touch()"
              )
          p(v-if="!$v.User.username.alphaNum" class="error") must be alpha numeric 
          p(v-if="!$v.User.username.minLength" class="error") minimum 8 characters required
        .column
          b-field(label="Password")
            b-input(
              type="text"
              class="input"
              placeholder="Enter Password"
              :class="{ 'hasError': $v.User.password.$error}"
              v-model.lazy="$v.User.password.$model"
              @blur="$v.User.password.$touch()"
              )
          p(v-if="!$v.User.password.alphaNum" class="error") must be alpha numeric 
          p(v-if="!$v.User.password.minLength" class="error") minimum 8 characters required
      .columns
      .column 
        b-field(label="Email")
          b-input(
            type="email"
            class="input"
            placeholder="Enter Email" 
            :class="{ 'hasError': $v.User.email.$error}"
              v-model.lazy="$v.User.email.$model"
              @blur="$v.User.email.$touch()"
            )
        p(v-if="!$v.User.email.email" class="error") invalid email, email format be like xyz@abc.com
      .columns
        .column
          b-field(label="Address")
           b-input(type="textarea" maxlength="200" v-model="User.address" rows="2" class="inputArea" placeholder="Enter  Address")
      .columns  
        .column
          center
            .button.is-dark.card.buttonmt(@click="RegisterUser")
              v-icon.Item(name="plus")
              | Add User                                
</template>

<script>
import {
  required,
  maxLength,
  alpha,
  minLength,
  alphaNum,
  email,
  integer
} from "vuelidate/lib/validators";
import { mapState } from "vuex";

export default {
  data() {
    return {
      User: {
        first_name: "",
        last_name: "",
        gender: "male",
        dob: null,
        mobile: "",
        address: "",
        isAdmin: "false",
        username: "",
        password: "",
        email: "",
        typeDate: ""
      },
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
      message: state => state.User.message
    })
  },
  validations: {
    User: {
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
      password: {
        required,
        alphaNum,
        minLength: minLength(8)
      },
      email: {
        required,
        email
      }
    }
  },
  methods: {
    async RegisterUser() {
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
        this.$store.dispatch("REGISTER_USER", this.User);
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
    }
  }
};
</script>
