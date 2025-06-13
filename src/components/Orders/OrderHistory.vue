<template>
  <div class="flex">
    <Sidebar />
    <main class="flex-1 p-6 bg-gray-100">
      <h1 class="text-2xl font-bold mb-4">История заказов</h1>
      <div class="bg-white rounded shadow overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-200 text-sm text-gray-700">
            <tr>
              <th class="p-3 border">Номер заказа</th>
              <th class="p-3 border">Статус</th>
              <th class="p-3 border">Состав</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in archivedOrders" :key="order.id" class="border-b">
              <td class="p-3 border">{{ order.number }}</td>
              <td class="p-3 border">{{ order.status }}</td>
              <td class="p-3 border">
                <ul class="space-y-1 text-sm">
                  <li v-for="item in order.items" :key="item.item.id">
                    {{ item.item.name }} — {{ item.quantity }} шт (Цех: {{ item.workshop.name }})
                  </li>
                </ul>
              </td>
            </tr>
            <tr v-if="archivedOrders.length === 0">
              <td colspan="3" class="text-center py-4 text-gray-500">История пуста</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useOrdersStore } from '../../stores/ordersStore'
import Sidebar from '@/components/Layout/TheSidebar.vue'
import { computed } from 'vue'

const store = useOrdersStore()
const archivedOrders = computed(() => store.archivedOrders)
</script>
