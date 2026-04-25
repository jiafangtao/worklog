import type { PiniaPluginContext } from 'pinia'

declare module 'pinia' {
  interface DefineStoreOptionsBase<S, Store> {
    persist?: boolean
  }
}

export function piniaLocalStoragePlugin({ store, options }: PiniaPluginContext) {
  if (!options.persist) return

  const key = `worklog__${store.$id}`

  const saved = localStorage.getItem(key)
  if (saved) {
    try {
      store.$patch(JSON.parse(saved))
    } catch {
      localStorage.removeItem(key)
    }
  }

  store.$subscribe((_mutation, state) => {
    localStorage.setItem(key, JSON.stringify(state))
  })
}
