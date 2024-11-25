<script setup lang="ts">
import BaseForm from './BaseForm.vue'
import { ref, onMounted } from 'vue'

const props = defineProps<{
  title: string
  fields: { name: string; label: string; type: string; required?: boolean }[]
  show: boolean
  initialData?: Record<string, any>
}>()

const emit = defineEmits<{
  close: []
  submit: [formData: Record<string, any>]
}>()

const formData = ref<Record<string, any>>({})

onMounted(() => {
  if (props.initialData) {
    formData.value = { ...props.initialData }
  }
})
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center px-4">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
        <div class="absolute right-0 top-0 pr-4 pt-4">
          <button
            type="button"
            @click="emit('close')"
            class="rounded-md bg-white text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">Close</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="sm:flex sm:items-start">
          <div class="mt-3 w-full text-center sm:mt-0 sm:text-left">
            <h3 class="text-lg font-semibold leading-6 text-gray-900 mb-4">{{ title }}</h3>
            <BaseForm
              :fields="fields"
              :initial-data="initialData"
              submit-label="Update"
              @submit="emit('submit', $event)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>