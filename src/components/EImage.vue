<template>

<div class="row">
        <div class="col-auto">
          <QImg :src="imageObj.src" :alt="imageObj.alt">          
            <template v-slot:loading>
              <EComponent :item="imageObj.loading" v-if="imageObj.loading"></EComponent>
            </template>
            <template v-slot:error>
              <EComponent :item="imageObj.error" v-if="imageObj.error"></EComponent>
            </template v-else-if="imageObj.caption>
            <EComponent :item="imageObj.caption" v-if="imageObj.caption"></EComponent>
          </QImg>
        </div>
      </div>
</template>

<script setup lang="ts">
import { Image, View } from "../utils/DataTypes";
import EComponent from "../components/EComponent.vue"
import { onBeforeMount } from "vue";
const props = defineProps({
    image: {
        type: Object as () => Image,
        required: true
    },
})

const image = () => {
    if (typeof props.image === "string") {
        return {
          id: '',
          src: props.image,
          alt: props.image
        }
    }

    else {
        return {
          id: '',
          src: props.image.src,
          alt: props.image.alt,
          caption: props.image.caption,
          overlay: props.image.overlay,
          loading: props.image.loading,
          error: props.image.error
        }
    }
}

const imageObj: Image = image()

onBeforeMount(() => {

});
</script>