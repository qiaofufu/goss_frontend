import {ref} from "vue";
import {FetchObjectList} from "@/api/objects.js";
import {defineStore} from "pinia";

export const useObjectStore = defineStore('objects', {
  state: () => {
    return {
      objects: ref([])
    }
  },
    actions: {
        async fetchObjectList(param) {
            try {
                let data = await FetchObjectList(param)
                console.log(data.objects)
                this.objects = data.objects
            } catch (e) {
                return e
            }
        },
        cleanObjectList() {
            this.objects = []
        }
    }
})