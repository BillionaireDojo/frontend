import { defineStore } from 'pinia'

export const useStatStore = defineStore('stat', {
    state: () => ({
        stat: {},
    }),
    getters: {
        getStat() {
            return this.stat;
        }
    },
    actions: {
        setStat(stat) {
            this.stat = stat;
        }
    }
})