<template>
  <form
    class="form"
    :class="{
      'form--success': state === 'success',
      'form--error': state === 'error',
    }"
    @submit.prevent
  >
    <router-view></router-view>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const route = useRoute()

    const state = computed(() => route.params.state)

    return {
      state,
    }
  },
})
</script>

<style lang="scss">
body {
  background: #f4f5fa;
}

.form {
  height: 556px;
  background: #ffffff;
  box-shadow: 10px 10px 60px #e2e7ff;
  border-radius: 0px 50px 50px 50px;
  padding: 35px;
  width: 440px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: auto;

  &:before {
    opacity: 0.2;
    z-index: -1;
    position: absolute;
    top: -18px;
    right: -38px;
    width: 112px;
    height: 128px;
    content: '';
    background-image: radial-gradient(#a6accc 33%, transparent 33%);
    background-size: 16px 16px;
  }

  &--success {
    background: #ffffff no-repeat center url('./assets/success-bg.png');
  }

  &--error {
    background: #ffffff no-repeat center url('./assets/failed-bg.png');
  }
}

p {
  margin: 0px;
}

.title {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 12px;
}

.label {
  line-height: 23px;
  margin-bottom: 12px;
}

.input {
  line-height: 19px;
  color: #d0d3e2;
  border: none;
  border-bottom: 1.5px solid rgba(225, 227, 238, 0.5);
  padding: 7px 0;
  margin-bottom: 15px;
}

.plus {
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid #23c967;
  width: 13px;
  height: 13px;
  position: relative;
  cursor: pointer;

  &:after,
  &:before {
    position: absolute;
    content: '';
    width: 7px;
    height: 1px;
    background: #23c967;
  }

  &:after {
    transform: rotate(90deg);
  }
}

button {
  border: none;
  background: none;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.button {
  background: #23c967;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  border-radius: 15px;
  margin-top: auto;

  &:disabled {
    background: #eee;
  }

  &--submitting:after {
    content: '';
    border: 2px solid #fff;
    border-top: 2px solid transparent;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    animation: spin 1.5s linear infinite;
  }

  &--error {
    background: #ea717f;
  }
}
</style>
