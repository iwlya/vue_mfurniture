<template>
  <div class="flex">
    <Sidebar />
    <main class="flex-1 p-6 bg-gray-100">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Цеха</h1>
        <button
          @click="router.push('/add-workshop')"
          class="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Добавить цех
        </button>
      </div>

      <div class="bg-white rounded shadow overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-200 text-sm text-gray-700">
            <tr>
              <th class="p-3 border">Название</th>
              <th class="p-3 border">Начальник</th>
              <th class="p-3 border">Действие</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="workshop in workshopStore.workshops" :key="workshop.id" class="border-b">
              <td class="p-3 border">{{ workshop.name }}</td>
              <td class="p-3 border">
                {{
                  managerStore.managers.find((m) => m.id === workshop.managerId)?.lastName || '—'
                }}
              </td>
              <td class="p-3 border space-x-2">
                <button @click="router.push(`/edit-workshop/${workshop.id}`)">✏️</button>
                <button @click="workshopStore.deleteWorkshop(workshop.id)">🗑</button>
              </td>
            </tr>
            <tr v-if="workshopStore.workshops.length === 0">
              <td colspan="3" class="text-center py-4 text-gray-500">Нет цехов</td>
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
import { useWorkshopsStore } from '../../stores/workshopsStore'
import { useManagersStore } from '../../stores/managersStore'

const router = useRouter()
const workshopStore = useWorkshopsStore()
const managerStore = useManagersStore()
</script>
