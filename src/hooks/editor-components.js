import {computed, reactive, ref} from "vue";

const components = reactive({
	titles: [],
	components: []
});

const pageComponents = ref([]);

export const useComponents = () => ({
	components: computed(() => components.components),
	pageComponents: computed(() => pageComponents.value),

	/**
	 * @param {{ title: String, category: String, builderComponent: import("vue").DefineComponent<{}, {}, any>, uiComponent: import("vue").DefineComponent<{}, {}, any>, data: Record<string, any>, imagePreview: string }} component 
	 */
	register(component) {
		if (components.titles.indexOf(component.title) === -1) {
			const slug = component.title.replace(/\ /g, '-').toLowerCase();

			components.titles = [...components.titles, component.title];
			components.components = [...components.components, { ...component, slug, data: { ...(component.data ?? {}) } }];
		}
	},

	setData(index, data) {
		pageComponents.value = pageComponents.value.map((c, i) => {
			if (i === index) {
				if (c.data) {
					return { ...c, data: { ...c.data, ...data } }
				}
				return { ...c, data };
			}
			return c;
		})
	},

	injectComponentInPage(title, defaultData = {}) {
		pageComponents.value = [
			...pageComponents.value,
			{ ...components.components[components.titles.indexOf(title)], data: { ...(components.components[components.titles.indexOf(title)].data ?? defaultData) } }
		];
	},

	deleteComponentInPage(index) {
		pageComponents.value = pageComponents.value
			.reduce((r, c, i) =>
				index === i ? r : [ ...r, c ], []);
	}
});
