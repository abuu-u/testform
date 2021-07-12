<template>
  <p class="title">Adding more products</p>

  <p class="label">The more items you check, the better the price.</p>

  <ul class="list">
    <li v-for="product in products" :key="product.count" class="list__item">
      <input
        :id="`${product.count}`"
        type="radio"
        name="product"
        :checked="product.count === selectedProduct.count"
        class="visually-hidden"
      />
      <label
        :for="`${product.count}`"
        class="list__label"
        :class="{
          'list__label--checked': product.count === selectedProduct.count,
        }"
        @click="handleProductClick(product)"
      >
        <p v-if="product.count > 1" class="list__price">
          {{ product.count }} products for {{ product.totalPrice }} usd /
          {{ product.priceForEach }}$ for each
        </p>
        <p v-else class="list__price">
          {{ product.count }} product for {{ product.totalPrice }} usd
        </p>

        <p v-if="product.discount" class="list__discount">
          You safe {{ product.discount }}% on each patent check
        </p>
      </label>
    </li>
  </ul>

  <button class="button" type="submit" @click="handleContinue">Continue</button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { Product, useStore } from '../store'

export default defineComponent({
  name: 'Edit',
  setup() {
    const store = useStore()
    const router = useRouter()

    const products = computed(() => store.state.products)
    const selectedProduct = computed(() => store.state.selectedProduct)

    const handleContinue = () => router.push('/')
    const handleProductClick = (product: Product) =>
      store.commit('setSelected', product)

    return {
      products,
      selectedProduct,
      handleContinue,
      handleProductClick,
    }
  },
})
</script>

<style lang="scss">
.list {
  list-style: none;
  padding: 0px;
  margin: 0px;
  border-radius: 15px;
  overflow: hidden;
  border: 1.5px solid #e1e3ee;
  margin-bottom: 23px;

  &__item:not(:last-of-type) {
    border-bottom: 1.5px solid #e1e3ee;
  }

  &__label {
    height: 60px;
    display: flex;
    flex-direction: column;
    padding: 11px 17px 11px 51px;
    position: relative;
    justify-content: center;

    &:before,
    &:after {
      content: '';
      position: absolute;
      border-radius: 50%;
    }

    &:before {
      left: 17px;
      width: 22px;
      height: 22px;
      border: 1.5px solid #e1e3ee;
    }

    &--checked {
      background: #f4f5fa;

      &:after {
        left: 23px;
        width: 12px;
        height: 12px;
        background: #23c967;
      }
    }
  }

  &__price {
    font-size: 16px;
    line-height: 20px;
    color: #000000;
  }

  &__discount {
    font-size: 13px;
    line-height: 15px;
    color: #a7a2cb;

    .list__label--checked & {
      color: #23c967;
    }
  }
}

.remove-product {
  font-size: 0px;
  transform: rotate(45deg);
}
</style>
