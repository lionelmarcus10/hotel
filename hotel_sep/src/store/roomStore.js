import { defineStore } from "pinia";
export const useRoomStore = defineStore("roomStore",{
    state: () => ({
        rooms: [],
        shippingRooms: [],
        staleTime: null,
    }),
    getters: {
        getShippingRooms: (state) => state.shippingRooms,
        getTotalShippingRoomsPrice: (state) => {
            return state.shippingRooms.reduce((acc, room) => acc + room.price, 0);
        },
        getRooms() {
            return this.rooms;
        }
    },
    actions: {
        addToShippingRooms(room) {
            this.shippingRooms = [...new Set([...this.shippingRooms, room])];
        },
       
        removeFromShippingRooms(room) {
            this.shippingRooms = this.shippingRooms.filter((r) => r !== room);
        },
        
        resetShippingRooms() {
            this.shippingRooms = [];
        },
        updateShippingRooms(rooms) {
            this.shippingRooms = rooms;
        },
        updateRooms(rooms) {
            this.rooms = rooms;
        }
    },    
     persist: {
        storage: window.localStorage,
        key: "roomStore",

     }
},


)