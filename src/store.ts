import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';

export interface Product {
  count: number
  discount?: number
  totalPrice?: number
  priceForEach?: number
}

export interface State {
  products: Product[]
  selectedProduct: Product
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    products: [
      {
        count: 5,
        discount: 36,
        totalPrice: 80,
        priceForEach: 16,
      },
      {
        count: 4,
        discount: 28,
        totalPrice: 72,
        priceForEach: 18,
      },
      {
        count: 3,
        discount: 20,
        totalPrice: 60,
        priceForEach: 20,
      },
      {
        count: 2,
        discount: 12,
        totalPrice: 44,
        priceForEach: 22,
      },
      {
        count: 1,
        totalPrice: 24.99,
      },
    ],

    selectedProduct: {
      count: 1,
      totalPrice: 24.99,
    },
  },

  mutations: {
    setSelected: (state, product) => (state.selectedProduct = product),
    removeProduct: (state) => {
      if (state.selectedProduct.count === 1) {
        state.selectedProduct = {
          count: 0,
        }
      } else {
        const product = state.products.find(
          (it) => it.count === state.selectedProduct.count - 1,
        )

        if (product) {
          state.selectedProduct = product
        }
      }
    },
  },
})

export const useStore = (): Store<State> => {
  return baseUseStore(key)
}
