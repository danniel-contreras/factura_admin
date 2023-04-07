
<template>
    <div class="w-screen h-screen bg-white shadow sm:rounded-lg flex justify-center items-center">
        <div class="h-[80vh] p-12 w-96 border shadow rounded-xl">
            <div>
                <img src="https://grupofacela.com/wp-content/uploads/2019/02/main-logo-facela-top.png"
                    class="w-32" />
            </div>
            <div class="mt-8 flex flex-col items-center">
                <h1 class="text-2xl xl:text-3xl font-semibold text-gray-700">
                    Bienvenido
                </h1>
                <div class="w-full flex-1 mt-4">

                    <div class="border-b text-center">
                        <div
                            class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Inicia sesion con tus datos
                        </div>
                    </div>

                    <div class="mx-auto max-w-xs">
                        <div class="w-full flex justify-center items-center relative">
                            <oh-vue-icon class="absolute z-10 bottom-3 text-gray-600 left-2" scale="1.5"
                                name="fa-user-circle" />
                            <input
                                class="relative w-full px-8 pl-14 font-semibold py-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                type="email" placeholder="Email" />
                        </div>

                        <div class="w-full flex justify-center items-center relative">
                            <oh-vue-icon class="absolute z-10 bottom-3 text-gray-600 left-2" scale="1.5"
                                name="fa-lock" />
                            <input
                                class="relative w-full px-8 pl-14 font-semibold py-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                type="password" placeholder="Contraseña" />
                        </div>
                        <button
                            class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span class="ml-3">
                                Sign Up
                            </span>
                        </button>
                        <div class="py-6">
                            <p class="text-xs float-right font-semibold cursor-pointer text-gray-600 text-center">
                                ¿Olvidaste tu contraseña?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import OhVueIcon from '../../plugins/vue-icons';


</script>