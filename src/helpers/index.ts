export type UUID = string
export type timestamp = number

// Simple implementation of ES6 Map class.
// When targeting ES6, use Map class instead.
export type Dictionary<K extends string | number, V> = { [key in K] : V }

export const awaitableTimeout = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
