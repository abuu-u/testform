import { createRouter, createWebHistory } from 'vue-router';
import Edit from './views/Edit.vue';
import Home from './views/Home.vue';
import Payment from './views/Payment.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/edit', name: 'edit', component: Edit },
  {
    path: '/paymentsuccess',
    name: 'success',
    component: Payment,
    props: {
      state: 'success',
      title: 'Successfull payment',
      text: 'Your request has been accepted and will be processed within 24 working hours. We will send you a payment details and all information to your email.',
    },
  },
  {
    path: '/paymenterror',
    name: 'error',
    component: Payment,
    props: {
      state: 'error',
      title: 'Your payment failed',
      text: 'Sorry, but we’ve having trouble processing your payment. You have been not charged for this transaction.',
    },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
