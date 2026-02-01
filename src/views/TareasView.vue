<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <h1 class="text-3xl font-bold text-center mb-6 text-gray-800">Tablón De Tareas</h1>
    <!-- Botón para ir al workspace -->
<div class="text-center mb-6">

<button @click="goToWorkspace"
        class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">Ver mis tareas asignadas
</button>
</div>

    <!-- Filtro -->
    <div class="mb-4 text-center">
      <select v-model="filtro" class="border px-3 py-1 rounded">
        <option value="all">Todas</option>
        <option value="completed">Completadas</option>
        <option value="pending">Pendientes</option>
        <option value="assigned">Asignadas</option>
      </select>
    </div>

    <!-- Lista de tareas filtradas -->
    <TaskCardView
      v-for="tarea in tareasFiltradas"
      :key="tarea.id"
      :tarea="tarea"
      @agregar="asignarTarea"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import TaskCardView from '@/components/TaskCardView.vue'
import { auth, db } from '@/firebase/config'
import { doc, setDoc, arrayUnion } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const tareas = ref([])
const filtro = ref('all')


const goToWorkspace=()=>{
  router.push('/workspace')
}



// Redirigir si no logeado
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (!user) router.push('/login')
  })
})

// Traer tareas
onMounted(async () => {
  try {
    const res = await axios.get('https://dummyjson.com/todos')
    tareas.value = res.data.todos
    tareas.value = res.data.todos.map(t => ({
    ...t,
    assignedTo: null
}))
  } catch (err) {
    alert('Error cargando tareas: ' + err.message)
  }
})


const tareasFiltradas = computed(() => {
  switch (filtro.value) {
    case 'completed':
      return tareas.value.filter(t => t.completed)
    case 'pending':
      return tareas.value.filter(t => !t.completed)
    case 'assigned':
      return tareas.value.filter(t => t.assignedTo)
    default:
      return tareas.value
  }
})


const asignarTarea = async (tarea) => {
  if (!auth.currentUser) return alert('Debes iniciar sesión')
  if (tarea.completed) return alert('No se puede asignar tareas completadas')
  if (tarea.assignedTo) return alert('Tarea ya asignada')

  try {
    const userRef = doc(db, 'users', auth.currentUser.uid)
// Guardar tarea en Firestore
    await setDoc(
      userRef,
      {
        tasks: arrayUnion({
          id: tarea.id,
          todo: tarea.todo,
          completed: tarea.completed
        })
      },
      { merge: true }
    )
    tarea.assignedTo = auth.currentUser.uid
  } catch (err) {
    alert('Error al asignar tarea: ' + err.message)
  }
}

</script>
