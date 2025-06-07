<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" 
    ref="stepper" 
    color="primary" animated>
      <q-step
        v-for="(form, index) in formList.forms"
        :name="index"
        :title="form.heading?.label || ''"
        :icon="form.heading?.icon || ''"
        :caption="form?.description?.label || ''"
        :done="step > index"
      >
      <EForm :form="form"></EForm>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <!--EAction :action="action" v-for="(action, k) in formList.content[step].actions" :key="k"></EAction-->
          <q-btn
            @click="step === formList.forms.length 
              ? (typeof formList.submit.event === 'function' && formList.submit.event(...formList.submit.args)) 
              : ($refs.stepper as any).next()"
            color="primary"
            :label="step === formList.forms.length ? 'Finish' : 'Continue'"
          />
          <q-btn
            v-if="step > 1"
            flat
            color="primary"
            @click="($refs.stepper as InstanceType<typeof import('quasar')['QStepper']>).previous()"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>
<script lang="ts">
import { Repository } from "@edifiles/services";
import { FormList } from "../utils/DataTypes";
import { config } from "../../public/config";
import EAction from "./EAction.vue";
import EForm from "./EForm.vue";

import { defineComponent } from "vue";
const repository = new Repository(config.api.Supabase);

export default defineComponent({
  component: {
    EAction,
    EForm
  },
  data() {
    return {
      step: 1,
      repository,
    };
  },
  /*setup () {
    return {
      step: ref(1)
    }
  },*/
  props: {
    formList: {
      type: Object as () => FormList,
      required: true,
    },
  },
  methods: {
    schedule(value: string) {
      //const client = new RestClient(config.api.Auth)
      //client.post('schedule', new Date(value))
      console.log("Schedule: ", value)
    },
    /*submit() {
      const fo = this.formList.forms.map((data)=> {
        data.content?.map((dat)=> {
          return {
            [dat.name]: dat.answer
          }
        })
      })
      const { data, error } = this.formList.actions.submit.event(...this.formList.actions.submit.args);
      if (data && this.formList.actions.submit.onResult) {
        this.formList.actions.submit.onResult();
      }
    }*/
  },
});
</script>
