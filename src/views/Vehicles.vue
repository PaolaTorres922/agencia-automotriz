<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from '../stores'
import DataTable from '../components/DataTable.vue'
import CreateModal from '../components/CreateModal.vue'

const store = useStore()
const showCreateModal = ref(false)

const columns = [
  { key: 'brand', label: 'Brand' },
  { key: 'model', label: 'Model' },
  { key: 'year', label: 'Year' },
  { key: 'color', label: 'Color' },
  { key: 'plate', label: 'Plate' }
]

const formFields = [
  { name: 'brand', label: 'Brand', type: 'text', required: true },
  { name: 'model', label: 'Model', type: 'text', required: true },
  { name: 'year', label: 'Year', type: 'number', required: true },
  { name: 'color', label: 'Color', type: 'text', required: true },
  { name: 'plate', label: 'Plate', type: 'text', required: true },
  { name: 'client_id', label: 'Client ID', type: 'number', required: true }
]

const handleCreate = async (formData: Record<string, any>) => {
  try {
    await store.createVehicle(formData)
    showCreateModal.value = false
  } catch (error) {
    console.error('Failed to create vehicle:', error)
  }
}

onMounted(() => {
  store.fetchVehicles()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Vehicles</h2>
      <button
        @click="showCreateModal = true"
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Add Vehicle
      </button>
    </div>
    
    <div v-if="store.loading" class="text-center py-4">Loading...</div>
    <div v-else-if="store.error" class="text-red-600">{{ store.error }}</div>
    <DataTable v-else :data="store.vehicles" :columns="columns" />

    <CreateModal
      title="Create New Vehicle"
      :fields="formFields"
      :show="showCreateModal"
      @close="showCreateModal = false"
      @submit="handleCreate"
    />
  </div>
</template>