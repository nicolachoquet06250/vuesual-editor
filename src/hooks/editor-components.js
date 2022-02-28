import {computed, reactive, ref} from "vue";

const components = reactive({
	titles: [],
	components: []
});

const pageComponents = ref([]);

export const useComponents = () => ({
	components: computed(() => components.components),
	pageComponents: computed(() => pageComponents.value),

	register(component) {
		if (components.titles.indexOf(component.title) === -1) {
			const slug = component.title.replace(/\ /g, '-').toLowerCase();

			components.titles = [...components.titles, component.title];
			components.components = [...components.components, { ...component, slug, data: { ...(component.data ?? {}) } }];
		}
	},

	setData(title, index, data) {
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

	deleteComponentInPage(title, index) {
		pageComponents.value = pageComponents.value
			.reduce((r, c, i) =>
				index === i ? r : [ ...r, c ], []);
	}
});