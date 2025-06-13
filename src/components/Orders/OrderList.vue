<template>
  <div class="flex">
    <Sidebar />
    <main class="flex-1 p-6 bg-gray-100">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Заказы</h1>
        <div class="space-x-2">
          <button @click="router.push('/history')" class="px-4 py-2 bg-gray-700 text-white rounded">
            История заказов
          </button>
          <button
            @click="router.push('/add-order')"
            class="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Добавить заказ
          </button>
        </div>
      </div>

      <div class="bg-white rounded shadow overflow-x-auto">
        <table class="w-full text-left border">
          <thead class="bg-gray-200 text-sm text-gray-700">
            <tr>
              <th class="p-3 border">Номер заказа</th>
              <th class="p-3 border">Клиент</th>
              <th class="p-3 border">Статус заказа</th>
              <th class="p-3 border">Действие</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="order in orders" :key="order.id">
              <!-- Основной заказ -->
              <tr class="bg-white border-b">
                <td class="p-3 border cursor-pointer" @click="toggleOrder(order.id)">
                  {{ order.number }}
                </td>

                <td class="p-3 border">
                  {{ order.client?.surname }} {{ order.client?.name }} <br />
                  <span class="text-gray-500 text-sm">{{ order.client?.phone }}</span>
                </td>

                <td class="p-3 border">
                  <select
                    v-model="order.status"
                    @change="updateStatus(order)"
                    class="border p-1 rounded"
                  >
                    <option>Принят</option>
                    <option>В работе</option>
                    <option>Готов</option>
                    <option>Отгружен</option>
                    <option>Завершен</option>
                  </select>
                </td>

                <td class="p-3 border text-lg space-x-2">
                  <button @click="router.push(`/edit-order/${order.id}`)" title="Редактировать">
                    ✏️
                  </button>
                  <button @click="deleteOrder(order.id)" title="Удалить">🗑️</button>
                </td>
              </tr>

              <!-- Детали позиций заказа -->
              <tr v-if="expandedOrderId === order.id">
                <td colspan="4" class="bg-gray-50 p-4">
                  <div
                    v-for="(item, index) in order.items"
                    :key="index"
                    class="mb-2 p-2 border rounded bg-white"
                  >
                    <div class="flex justify-between items-center">
                      <div>
                        <strong>{{ item.item.name }}</strong> — Цех: {{ item.workshop.name }},
                        Кол-во: {{ item.quantity }}
                      </div>
                      <div>
                        <select
                          v-model="item.status"
                          @change="updateItemStatus(order.id, index, item.status)"
                          class="border rounded p-1"
                        >
                          <option>Принят</option>
                          <option>В работе</option>
                          <option>Готов</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </template>

            <tr v-if="orders.length === 0">
              <td colspan="3" class="text-center py-4 text-gray-500">Нет заказов</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/Layout/TheSidebar.vue'
import { useOrdersStore } from '../../stores/ordersStore'

const router = useRouter()
const store = useOrdersStore()
const orders = computed(() => store.activeOrders)

const expandedOrderId = ref(null)

const toggleOrder = (id) => {
  expandedOrderId.value = expandedOrderId.value === id ? null : id
}

const deleteOrder = (id) => {
  store.deleteOrder(id)
}

const updateStatus = (order) => {
  store.updateStatus(order.id, order.status)
}

const updateItemStatus = (orderId, index, newStatus) => {
  store.updateItemStatus(orderId, index, newStatus)
}
</script>
