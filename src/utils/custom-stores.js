import { writable } from "svelte/store";

export function advancedStore(defaultValue, emptyValue = "") {
  const { subscribe, set, update } = writable(defaultValue);

  return {
    subscribe,
    set,
    update,
    reset: () => update(() => emptyValue),
  };
}
