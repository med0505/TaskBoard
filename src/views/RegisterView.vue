<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-500">
    <div class="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-xl w-80">
      <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">Crear cuenta ✨</h1>

      <form @submit.prevent="registrarUser" class="space-y-4">
        <input v-model="name" type="text" placeholder="Nombre" class="w-full px-4 py-2 border rounded-lg" />
        <input v-model="email" type="email" placeholder="Email" class="w-full px-4 py-2 border rounded-lg" />
        <input v-model="password" type="password" placeholder="Contraseña" class="w-full px-4 py-2 border rounded-lg" />

        <button type="submit" class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
          Registrarse
        </button>
      </form>

      <p class="text-center text-sm text-gray-600 mt-5">
        ¿Ya tienes cuenta?
        <router-link to="/login" class="text-purple-600 font-medium hover:underline">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '@/firebase/config'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const registrarUser = async () => {
  if (!name.value || !email.value || !password.value) {
    alert('Todos los campos son obligatorios')
    return
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    await updateProfile(userCredential.user, { displayName: name.value })
    await sendEmailVerification(userCredential.user)
    alert('Usuario registrado. Revisa tu correo para verificar tu cuenta')
    router.push('/login')
  } catch (err) {
    alert('Error al registrar: ' + err.message)
  }
}
</script>

