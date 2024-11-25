<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  fields: {
    name: string
    label: string
    type: string
    required?: boolean
  }[]
  submitLabel?: string
  initialData?: Record<string, any>
}>()

const emit = defineEmits<{
  submit: [formData: Record<string, any>]
}>()

const formData = ref<Record<string, any>>({})

onMounted(() => {
  if (props.initialData) {
    formData.value = { ...props.initialData }
  }
})

const handleSubmit = (e: Event) => {
  e.preventDefault()
  emit('submit', { ...formData.value })
}
</script>

<template>
  <form @submit="handleSubmit" class="space-y-4">
    <div v-for="field in fields" :key="field.name" class="space-y-1">
      <label :for="field.name" class="block text-sm font-medium text-gray-700">
        {{ field.label }}
      </label>
      <input
        :id="field.name"
        v-model="formData[field.name]"
        :type="field.type"
        :required="field.required"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    <div class="pt-4">
      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {{ submitLabel || 'Submit' }}
      </button>
    </div>
  </form>
</template>