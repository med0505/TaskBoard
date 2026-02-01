import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/register' , component : () => import('@/views/RegisterView.vue')},
    {path:'/login' , component : () => import('@/views/LoginView.vue')},
    {path:'/workspace' , component : () => import('@/views/WorkspaceView.vue')},// , meta: { requiresAuth: true }},
    {path:'/' , component : () => import('@/views/TareasView.vue')} //, meta: { requiresAuth: true }}

  ],
})

let authReady = false

router.beforeEach((to, from, next) => {
  if (!authReady) {
    onAuthStateChanged(auth, user => {
      authReady = true

      if (to.meta.requiresAuth && !user) {
        next('/login')
      } else if (
        user &&
        (to.path === '/login' || to.path === '/register')
      ) {
        next('/')
      } else {
        next()
      }
    })
  } else {
    const user = auth.currentUser

    if (to.meta.requiresAuth && !user) {
      next('/login')
    } else {
      next()
    }
  }
})
export default router

