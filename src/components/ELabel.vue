<template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Label } from "../utils/DataTypes";

export default defineComponent({
  name: "ELabel",
  props: {
    label: {
      type: Object as () => Label,
      required: true
    }
  }
});
</script>