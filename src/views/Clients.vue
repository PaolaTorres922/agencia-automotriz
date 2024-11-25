<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from '../stores'
import DataTable from '../components/DataTable.vue'
import CreateModal from '../components/CreateModal.vue'
import EditModal from '../components/EditModal.vue'

const store = useStore()
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedClient = ref<any>(null)

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'lastname', label: 'Last Name' },
  { key: 'address', label: 'Address' },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' }
]

const formFields = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'lastname', label: 'Last Name', type: 'text', required: true },
  { name: 'address', label: 'Address', type: 'text', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true }
]

const handleCreate = async (formData: Record<string, any>) => {
  try {
    await store.createClient(formData)
    showCreateModal.value = false
  } catch (error) {
    console.error('Failed to create client:', error)
  }
}

const handleEdit = (client: any) => {
  selectedClient.value = client
  showEditModal.value = true
}

const handleUpdate = async (formData: Record<string, any>) => {
  try {
    await store.updateClient(selectedClient.value.id, formData)
    showEditModal.value = false
    selectedClient.value = null
  } catch (error) {
    console.error('Failed to update client:', error)
  }
}

onMounted(() => {
  store.fetchClients()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Clients</h2>
      <button
        @click="showCreateModal = true"
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Add Client
      </button>
    </div>
    
    <div v-if="store.loading" class="text-center py-4">Loading...</div>
    <div v-else-if="store.error" class="text-red-600">{{ store.error }}</div>
    <DataTable 
      v-else 
      :data="store.clients" 
      :columns="columns"
      @edit="handleEdit"
    />

    <CreateModal
      title="Create New Client"
      :fields="formFields"
      :show="showCreateModal"
      @close="showCreateModal = false"
      @submit="handleCreate"
    />

    <EditModal
      v-if="selectedClient"
      title="Edit Client"
      :fields="formFields"
      :show="showEditModal"
      :initial-data="selectedClient"
      @close="showEditModal = false"
      @submit="handleUpdate"
    />
  </div>
</template>