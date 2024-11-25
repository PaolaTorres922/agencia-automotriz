<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Clients', path: '/clients' },
  { name: 'Vehicles', path: '/vehicles' },
  { name: 'Services', path: '/services' },
  { name: 'Offers', path: '/offers' },
]
</script>

<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <h1 class="text-xl font-bold text-gray-800">Car Dealership</h1>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <RouterLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.path"
              class="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2"
              active-class="border-indigo-500"
              :class="{ 'border-transparent hover:border-gray-300': $route.path !== item.path }"
            >
              {{ item.name }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>