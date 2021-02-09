<template lang="pug">
center
  .modal.is-active
    .modal-background
      .modal-content  
        c-footer.card.box      
        .card-body.box.component.logPos                                      
            h2.box.componentHead LOGIN USER
            b-loading(:active.sync='isLoading')
             v-icon(name="sync" scale="6" spin)
            .card-body
              b-notification(title="Warning!" v-if="isError" type="is-warning")
                p {{msg}}
              form
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
                  b-field(label="Password")
                    b-input(
                      type="password"
                      class="input"
                      placeholder="Enter Password"
                      :class="{ 'hasError': $v.User.password.$error}"
                      v-model.lazy="$v.User.password.$model"
                      @blur="$v.User.password.$touch()"    
                      password-reveal                
                      )            
                  p(v-if="!$v.User.password.minLength" class="error") minimum 8 characters required
              .columns  
                .column
                  center
                    .button.is-success.card.buttonmt(@click="LoginUser")
                      v-icon.Item(name="lock-open")
                      | Login                               
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapState } from "vuex";
import Footer from "../../reusables/Footer";

export default {
  components: {
    "c-footer": Footer
  },
  data() {
    return {
      User: {
        password: null,
        email: null
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
      login: state => state.User.login,
      users: state => state.User.users
    })
  },
  validations: {
    User: {
      password: {
        required,
        minLength: minLength(8)
      },
      email: {
        required,
        email
      }
    }
  },

  mounted() {
    this.$store.dispatch("VIEW_USERS");
  },
  methods: {
    async LoginUser() {
      var user = this.users.filter(user => {
        return user.email === this.User.email;
      });
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
        if (user.length === 0) {
          this.isError = true;
          this.isActive = "slideMeDelete";
          this.typeData = "is-warning";
          this.msg = "Invalid Email!";
          setTimeout(() => {
            this.isSubmitted = false;
            this.isError = false;
            this.typeData = "";
            this.msg = "";
            this.isActive = "slideMeDeleteClose";
          }, 1500);
        } else {
          this.$store.dispatch("LOGIN_USER", this.User);
          this.isLoading = true;
          setTimeout(() => {
            this.isLoading = false;
            this.$router.push("/");
          }, 1500);
        }
      }
    }
  }
};
</script>
