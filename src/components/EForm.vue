<template>
  <form :id="form.id" v-if=show class="q-ma-md">
  <EView :view="form"></EView>
  <template v-for="(action, key) in form.actions" :key="key">
    <EAction :action="action" :args="filledForm"></EAction>
  </template>
  </form>
</template>

<script lang="ts">
  import { InputType } from "../utils/types";
  import { defineComponent } from "vue";
  import EAction from "./EAction.vue";
  import { FormField, FormView, View } from "../utils/DataTypes";
  
  let filledForm: Record<string, any> = {}
  let show: boolean = true
  //let model = []
  
  export default defineComponent({
    data() {
      return {
        options: ['Aaaaaaaaaaaaa', 'Bbbbnnnnn'],
        model: {},
        filledForm,
        show
      };
    },
    /*computed: {
      submit() {
        if(this.form.compute) {
          this.form.compute(this.filledForm)
        }
        return this.form.actions.submit
      }
    },*/
    /*setup () {
      return {
        step: ref(1)
      }
    },*/
    components: {
      EAction
    },
    props: {
      form: {
        type: Object as () => FormView,
        required: true,
      }
    },
    methods: {
      schedule(type: InputType, value: string) {
        //const client = new RestClient(config.api.Auth)
        //client.post('schedule', new Date(value))
        //console.log("Schedule: ", value)
        //useData().set(type, value)
      },
      handleInput(type: InputType, value: string) {
        //useData().set(type, value)
      console.log('FILLED_FORM', this.filledForm)
      },
      onOptionSelected (value: any) {
      console.log('Selected option:', value)
      // Your custom logic here
    },
      getValue (scope: any) {
        return scope.label
      },
      showOpt (value: string) {
        console.log("OPTION ", value)
      },
      hasChild (scope: any, name: string) {
        console.log('SCOPE: ', scope.opt)
        //return scope.opt.children.some(c => c.label === this.filledForm[name])
      }
    }
  });
  </script>