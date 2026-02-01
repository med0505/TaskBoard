<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-500">
    <div class="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-xl w-80">
      <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>

      <form @submit.prevent="loginUser" class="space-y-4">
        <input v-model="email" type="email" placeholder="Email" class="w-full px-4 py-2 border rounded-lg" />
        <input v-model="password" type="password" placeholder="Contraseña" class="w-full px-4 py-2 border rounded-lg" />

        <button type="submit" class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
          Iniciar sesión
        </button>
      </form>

      <p class="text-center text-sm text-gray-600 mt-5">
        ¿No tienes cuenta?
        <router-link to="/register" class="text-purple-600 font-medium hover:underline">Registrarse</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '@/firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const loginUser = async () => {
  if (!email.value || !password.value) {
    alert('Todos los campos son obligatorios')
    return
  }
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    if (!user.emailVerified) {
      alert('Debes verificar tu correo')
      return
    }
    router.push('/') // Redirige a tablón de tareas
  } catch (err) {
    alert('Error de login: ' + err.message)
  }
}
</script>
