<template>
  <p class="title">{{ title }}</p>

  <p class="label">{{ text }}</p>

  <button
    class="button"
    :class="{ 'button--error': state === 'error' }"
    @click="handleClick"
  >
    Try to pay again
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PaymentError',
  props: {
    state: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  setup() {
    const router = useRouter()

    const handleClick = () => router.push('/')

    return {
      handleClick,
    }
  },
})
</script>
