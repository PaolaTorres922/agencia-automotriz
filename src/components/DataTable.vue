<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  data: any[]
  columns: { key: string; label: string }[]
}>()

const emit = defineEmits<{
  edit: [item: any]
}>()

const headers = computed(() => props.columns.map(col => col.label))
const rows = computed(() => props.data)
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white rounded-lg overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th
            v-for="header in headers"
            :key="header"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ header }}
          </th>
          <th class="px-6 py-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="row in rows" :key="row.id">
          <td
            v-for="col in columns"
            :key="col.key"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
          >
            {{ row[col.key] }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button
              @click="emit('edit', row)"
              class="text-indigo-600 hover:text-indigo-900"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>