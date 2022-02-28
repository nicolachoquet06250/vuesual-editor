import {computed, ref} from "vue";

export const useResize = () => {
	const sidebarClosed = ref(false);
	const animating = ref(false);

	return {
		animating: computed(() => animating.value),
		closed: computed(() => sidebarClosed.value),

		onOpen() {
			animating.value = true;
			sidebarClosed.value = false;
		},
		onClose() {
			sidebarClosed.value = true;
		}
	}
};
