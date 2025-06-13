<template>
  <div class="flex">
    <Sidebar />
    <main class="flex-1 p-6 bg-gray-100">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Каталог мебели</h1>
        <button
          @click="router.push('/add-furniture')"
          class="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Добавить мебель
        </button>
      </div>

      <div class="bg-white rounded shadow overflow-x-auto">
        <table class="w-full text-left border">
          <thead class="bg-gray-200 text-sm text-gray-700">
            <tr>
              <th class="p-3 border">Название</th>
              <th class="p-3 border">Категория</th>
              <th class="p-3 border">Описание</th>
              <th class="p-3 border">Действие</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in catalog.items" :key="item.id" class="border-b">
              <td class="p-3 border">{{ item.name }}</td>
              <td class="p-3 border">{{ item.category }}</td>
              <td class="p-3 border">{{ item.description }}</td>
              <td class="p-3 border text-lg space-x-2">
                <button @click="router.push(`/edit-furniture/${item.id}`)">✏️</button>
                <button @click="catalog.deleteItem(item.id)">🗑️</button>
              </td>
            </tr>
            <tr v-if="catalog.items.length === 0">
              <td colspan="4" class="text-center py-4 text-gray-500">Нет мебели в каталоге</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCatalogStore } from '../../stores/catalogStore'
import Sidebar from '@/components/Layout/TheSidebar.vue'

const router = useRouter()
const catalog = useCatalogStore()
</script>
