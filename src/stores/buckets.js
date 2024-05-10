import {ref} from "vue";
import {CreateBuckets, ListBuckets} from "@/api/buckets.js";
import {defineStore} from "pinia";

export const useBucketsStore = defineStore('buckets', {
    state: () => {
        return {
            buckets: ref([])
        }
    },
    getters: {
        bucketList() {
            return this.buckets
        }
    },
    actions: {
        async createBuckets(param) {
            try {
                let data = await CreateBuckets(param)
                console.log(data.name)
                return data
            } catch (e) {
                return e
            }
        },
        async fetchBucketList() {
            try {
                let data = await ListBuckets()
                this.buckets = data.buckets
            } catch (e) {
                return e
            }
        }
    }
})