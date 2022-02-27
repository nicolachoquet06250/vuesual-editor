import {computed, reactive, ref} from "vue";
import type {DataType, EditorComponent} from "../types/hooks/editor-components";

const components = reactive<{ titles: string[], components: EditorComponent[] }>({
	titles: [],
	components: []
});

const pageComponents = ref<EditorComponent[]>([]);

export const useComponents = () => ({
	components: computed(() => components.components),
	pageComponents: computed(() => pageComponents.value),

	register(component: EditorComponent) {
		if (components.titles.indexOf(component.title) === -1) {
			const slug = component.title.replace(/\ /g, '-').toLowerCase();

			components.titles = [...components.titles, component.title];
			components.components = [...components.components, { ...component, slug, data: { ...(component.data ?? {}) } }];
		}
	},

	setData(title: string, index: number, data: DataType) {
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

	injectComponentInPage(title: string, defaultData: DataType = {}) {
		pageComponents.value = [
			...pageComponents.value,
			{ ...components.components[components.titles.indexOf(title)], data: { ...(components.components[components.titles.indexOf(title)].data ?? defaultData) } }
		];
	},

	deleteComponentInPage(title: string, index: number) {
		pageComponents.value = pageComponents.value
			.reduce((r: EditorComponent[], c: EditorComponent, i: number) =>
				index === i ? r : [ ...r, c ], []);
	}
});
