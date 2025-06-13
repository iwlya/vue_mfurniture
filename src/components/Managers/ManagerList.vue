<template>
  <div class="flex">
    <Sidebar />
    <main class="flex-1 p-6 bg-gray-100">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Начальники</h1>
        <button
          @click="router.push('/add-manager')"
          class="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Добавить начальника
        </button>
      </div>

      <div class="bg-white rounded shadow overflow-x-auto">
        <table class="w-full text-left border">
          <thead class="bg-gray-200 text-sm text-gray-700">
            <tr>
              <th class="p-3 border">Фамилия</th>
              <th class="p-3 border">Имя</th>
              <th class="p-3 border">Отчество</th>
              <th class="p-3 border">Действие</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="manager in store.managers" :key="manager.id" class="border-b">
              <td class="p-3 border">{{ manager.lastName }}</td>
              <td class="p-3 border">{{ manager.firstName }}</td>
              <td class="p-3 border">{{ manager.middleName || '-' }}</td>
              <td class="p-3 border space-x-2 text-lg">
                <button @click="router.push(`/edit-manager/${manager.id}`)">✏️</button>
                <button @click="store.deleteManager(manager.id)">🗑️</button>
              </td>
            </tr>
            <tr v-if="store.managers.length === 0">
              <td colspan="4" class="text-center py-4 text-gray-500">Нет начальников</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Layout/TheSidebar.vue'
import { useRouter } from 'vue-router'
import { useManagersStore } from '../../stores/managersStore'

const store = useManagersStore()
const router = useRouter()
</script>
