import {computed, ref, Ref} from "vue";

export const useResize = () => {
	const sidebarClosed: Ref<boolean> = ref<boolean>(false);
	const animating: Ref<boolean> = ref<boolean>(false);

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
