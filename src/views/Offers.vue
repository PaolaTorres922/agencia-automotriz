<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from '../stores'
import DataTable from '../components/DataTable.vue'
import CreateModal from '../components/CreateModal.vue'

const store = useStore()
const showCreateModal = ref(false)

const columns = [
  { key: 'type', label: 'Offer Type' },
  { key: 'date', label: 'Start Date' },
  { key: 'cost', label: 'Cost' },
  { key: 'valid_until', label: 'Valid Until' }
]

const formFields = [
  { name: 'type', label: 'Offer Type', type: 'text', required: true },
  { name: 'date', label: 'Start Date', type: 'date', required: true },
  { name: 'time', label: 'Time', type: 'time', required: true },
  { name: 'cost', label: 'Cost', type: 'number', required: true },
  { name: 'valid_until', label: 'Valid Until', type: 'date', required: true },
  { name: 'client_id', label: 'Client ID', type: 'number', required: true }
]

const handleCreate = async (formData: Record<string, any>) => {
  try {
    await store.createOffer(formData)
    showCreateModal.value = false
  } catch (error) {
    console.error('Failed to create offer:', error)
  }
}

onMounted(() => {
  store.fetchOffers()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Offers</h2>
      <button
        @click="showCreateModal = true"
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Add Offer
      </button>
    </div>
    
    <div v-if="store.loading" class="text-center py-4">Loading...</div>
    <div v-else-if="store.error" class="text-red-600">{{ store.error }}</div>
    <DataTable v-else :data="store.offers" :columns="columns" />

    <CreateModal
      title="Create New Offer"
      :fields="formFields"
      :show="showCreateModal"
      @close="showCreateModal = false"
      @submit="handleCreate"
    />
  </div>
</template>