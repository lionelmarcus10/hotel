import { defineStore } from "pinia";

export const useRoomStore = defineStore({
    state: () => ({
        shippingRooms: [],
        reservedRooms: [],
    }),
    getters: {
        getShippingRooms: (state) => state.shippingRooms,
        getReservedRooms: (state) => state.reservedRooms,
        getTotalShippingRoomsPrice: (state) => {
            return state.shippingRooms.reduce((acc, room) => acc + room.price, 0);
        }, 
    },
    actions: {
        addToShippingRooms(room) {
            this.shippingRooms.push(room);
        },
        addToReservedRooms(room) {
            this.reservedRooms.push(room);
        },
        removeFromShippingRooms(room) {
            this.shippingRooms = this.shippingRooms.filter((r) => r !== room);
        },
        removeFromReservedRooms(room) {
            this.reservedRooms = this.reservedRooms.filter((r) => r !== room);
        },
        resetShippingRooms() {
            this.shippingRooms = [];
        },
        resetReservedRooms() {
            this.reservedRooms = [];
        },
        updateShippingRooms(rooms) {
            this.shippingRooms = rooms;
        },
        updateReservedRooms(rooms) {
            this.reservedRooms = rooms;
        },
    },
})