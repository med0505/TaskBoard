<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Mi Workspace</h1>
      <div class="space-x-2">
        <button
          @click="goBack"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Volver al Tablón
        </button>
        <button
          @click="logoutUser"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">Cerrar sesión
        </button>
      </div>
    </div>

    <!-- Lista de tareas -->
    <div  class="grid gap-4">
      <div
        v-for="tarea in tareas"
        :key="tarea.id"
        class="bg-white p-4 rounded-lg shadow flex justify-between items-center"
      >
        <div>
          <p :class="{ 'line-through text-gray-400': tarea.completed }">{{ tarea.todo }}</p>
          <span class="text-xs text-gray-500">{{ tarea.completed ? 'Completada' : 'Pendiente' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth, db } from '@/firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const tareas = ref([])
const loading = ref(true)

// Redirige al login si no logueado y carga tareas
onMounted(async () => {
  if (!auth.currentUser) {
    router.push('/login')
    return
  }

  try {
    const userRef = doc(db, 'users', auth.currentUser.uid)
    const userSnap = await getDoc(userRef)
    tareas.value = userSnap.exists() ? userSnap.data().tasks || [] : []
  } catch (err) {
    alert('Error cargando tareas: ' + err.message)
  } finally {
    loading.value = false
  }
})

// Logout
const logoutUser = async () => {
  try {
    await signOut(auth)
    router.push('/login')
  } catch (err) {
    alert('Error cerrando sesión: ' + err.message)
  }
}
const goBack = () => {
  router.push('/')
}
</script>


