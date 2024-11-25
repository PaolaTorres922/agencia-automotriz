<script setup lang="ts">
</script>

<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Welcome to Car Dealership Management System</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <RouterLink
        v-for="(item, index) in ['Clients', 'Vehicles', 'Services', 'Offers']"
        :key="index"
        :to="'/' + item.toLowerCase()"
        class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ item }}</h2>
        <p class="text-gray-600">Manage {{ item.toLowerCase() }} information</p>
      </RouterLink>
    </div>
  </div>
</template>