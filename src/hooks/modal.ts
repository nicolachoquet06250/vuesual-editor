import {computed, Ref, ref, watch} from "vue";

const modals: Ref<Record<string, {
	ref: Ref<HTMLElement|undefined>,
	waiting: boolean
}>> = ref({});

export const useModal = <T extends string>() => ({
	modalIsOpened(name: T) {
		return computed(() => modals.value[name] ? modals.value[name].waiting : false);
	},

	registerModal(name: T, _ref: Ref<HTMLElement|undefined>) {
		modals.value = {
			...modals.value,
			[name]: {
				ref: _ref,
				waiting: true
			}
		}

		watch(_ref, () => {
			if (_ref.value) {
				modals.value = Object.keys(modals.value)
					.reduce((r, c) => {
						if (c !== name) {
							return {
								...r,
								[c]: modals.value[c]
							}
						}

						return {
							...r,
							[c]: {
								...modals.value[c],
								waiting: false
							}
						}
					}, {});
			}
		})
	},

	openModal(name: T) {
		if (!modals.value[name].waiting) {
			// @ts-ignore
			modals.value[name]?.ref.classList?.remove('closed');
		}
	},

	closeModal(name: T) {
		if (!modals.value[name].waiting) {
			// @ts-ignore
			modals.value[name]?.ref.classList?.add('closed');
		}
	}
});
