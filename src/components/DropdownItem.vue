<template>
  <li class="dropdownOption" :class="{ isDisabled: disabled }">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style>
.dropdownOption.isDisabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
