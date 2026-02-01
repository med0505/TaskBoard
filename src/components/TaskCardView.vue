<template>
  <div>
    <div class="p-3 bg-white rounded shadow flex justify-between items-center">
      <p :class="{ 'text-gray-400' : tarea.completed}">{{ tarea.todo }}</p>
      <span class="text-xs text-gray-500">{{ tarea.completed? 'completada':'Pendiente' }}</span>
      <button v-if="!tarea.completed && !tarea.assignedTo"
        @click="$emit('agregar', tarea)"
            class="bg-blue-600 text-white px-3 py-1 rounded">Agregar</button>

      <span
        v-else-if="tarea.assignedTo"
        class="text-xs text-gray-500">Ya asignada</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tarea: { type: Object , requiered: true}
})
</script>
