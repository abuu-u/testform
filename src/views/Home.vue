<template>
  <PerfectScrollbar>
    <fieldset>
      <p class="title">Info</p>

      <label class="label" for="email">Enter your email address</label>
      <input
        id="email"
        class="input"
        type="email"
        name="email"
        placeholder="team@checkforpatent.com"
      />
    </fieldset>

    <fieldset v-for="(product, i) in products" :key="product">
      <p class="title">
        {{ product }}
        <button class="plus remove-product" @click="handleRemoveClick(i)">
          Remove product
        </button>
      </p>

      <label class="label" :for="`${i}-keyword`"
        >Enter main keyword for the product</label
      >
      <input
        :id="`${i}-keyword`"
        class="input"
        type="text"
        name="`${i}-keyword`"
        placeholder="for example, sylicon wine cup"
      />

      <label class="label" :for="`${i}-similar-product-link`"
        >Enter link to the similar product as a reference</label
      >
      <input
        :id="`${i}-similar-product-link`"
        class="input"
        type="text"
        name="similar-product-link"
        placeholder="https://..."
      />
    </fieldset>

    <router-link class="add-more" to="/edit"
      >Add more products<span class="plus"></span
    ></router-link>

    <p class="discount">We offer discount up to 36% for multiple checks</p>
  </PerfectScrollbar>

  <button
    type="submit"
    :class="{ 'button--submitting': isSubmitting }"
    class="button"
    :disabled="!price"
    @click="handleSubmit"
  >
    <span v-if="!isSubmitting">Submit and Pay {{ price ?? 0 }} USD</span>
  </button>

  <p class="secure-text">Secure payment with Stripe</p>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '../store'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Home',
  components: {
    PerfectScrollbar,
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const isSubmitting = ref(false)

    const products = computed(() =>
      new Array(store.state.selectedProduct.count)
        .fill('')
        .map((_, i) => `Product ${i + 1}`),
    )
    const price = computed(() => store.state.selectedProduct.totalPrice)

    const handleRemoveClick = (i: number) => {
      products.value.splice(i, 1)
      store.commit('removeProduct')
    }

    const handleSubmit = () => {
      if (isSubmitting.value) {
        return
      }

      isSubmitting.value = true

      setTimeout(() => {
        isSubmitting.value = false

        const state = Math.round(Math.random()) ? 'success' : 'error'

        router.push({ name: state, params: { state } })
      }, 2000)
    }

    return {
      products,
      price,
      handleRemoveClick,
      handleSubmit,
      isSubmitting,
    }
  },
})
</script>

<style lang="scss">
.ps {
  max-height: 417px;
  margin-bottom: 20px;

  &__rail-y:hover &__thumb-y {
    background-color: #23c967;
  }

  &__thumb-y {
    background-color: #23c967;
  }
}

fieldset {
  display: flex;
  flex-direction: column;
  margin: 0px;
  border: none;
  padding: 0px;
  margin-bottom: 10px;
}

.add-more {
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #23c967;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.discount {
  line-height: 19px;
  color: #494471;
}

.secure-text {
  justify-content: center;
  font-size: 14px;
  line-height: 17px;
  color: #afb4cc;
  display: flex;

  &:before {
    width: 9px;
    height: 13px;
    content: '';
    background: url('../assets/lock.svg');
    margin-right: 4px;
  }
}
</style>
