import {computed, ref, watch} from "vue";

const modals = ref({});

export const useModal = () => ({
	modalIsOpened(name) {
		return computed(() => modals.value[name] ? modals.value[name].waiting : false);
	},

	registerModal(name, _ref) {
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

	openModal(name) {
		if (!modals.value[name].waiting) {
			modals.value[name]?.ref.classList?.remove('closed');
		}
	},

	closeModal(name) {
		if (!modals.value[name].waiting) {
			modals.value[name]?.ref.classList?.add('closed');
		}
	}
});
