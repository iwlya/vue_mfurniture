<template>
  <div class="flex">
    <Sidebar />
    <main class="flex-1 bg-gray-100 min-h-screen p-6">
      <OrderForm />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../components/Layout/TheSidebar.vue'
import OrderForm from '../components/Orders/OrderForm.vue'
</script>
