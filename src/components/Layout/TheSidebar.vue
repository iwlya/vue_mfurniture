<template>
  <aside class="w-64 h-screen bg-white border-r p-4">
    <h2 class="text-lg font-bold mb-6 flex items-center gap-2"><span>🪑</span> Фабрика мебели</h2>
    <nav class="space-y-2">
      <router-link
        to="/"
        class="block px-3 py-2 rounded hover:bg-blue-100"
        :class="{ 'bg-blue-100 text-blue-800 font-medium': $route.path === '/' }"
      >
        Заказы
      </router-link>

      <router-link
        to="/catalog"
        class="block px-3 py-2 rounded hover:bg-blue-100"
        :class="{ 'bg-blue-100 text-blue-800 font-medium': $route.path === '/catalog' }"
        >Каталог
      </router-link>

      <router-link
        to="/managers"
        class="block px-3 py-2 rounded hover:bg-blue-100"
        :class="{ 'bg-blue-100 text-blue-800 font-medium': $route.path === '/managers' }"
        >Начальники</router-link
      >

      <router-link
        to="/workshops"
        class="block px-3 py-2 rounded hover:bg-blue-100"
        :class="{ 'bg-blue-100 text-blue-800 font-medium': $route.path === '/workshops' }"
        >Цеха</router-link
      >
    </nav>
  </aside>
</template>
