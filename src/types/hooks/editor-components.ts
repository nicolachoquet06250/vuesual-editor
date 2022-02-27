import {DefineComponent, VueElement} from "vue";

export type Component = VueElement|Promise<VueElement>|DefineComponent<{}, {}, any>|Promise<DefineComponent<{}, {}, any>>;

export type DataType<T = any> = Record<string, T>|Array<Record<string, T>>;

export type EditorComponentImage = string|Promise<typeof import('*.png')|typeof import('*.svg')|typeof import('*.jpg')>|typeof import('*.png')|typeof import('*.svg')|typeof import('*.jpg')|(() => Promise<typeof import('*.png')|typeof import('*.svg')|typeof import('*.jpg')>|typeof import('*.png')|typeof import('*.svg')|typeof import('*.jpg'));

export type EditorComponent = {
	title: string,
	category: string,
	builderComponent: Component,
	uiComponent: Component,
	slug?: string,
	data?: DataType,
	imagePreview?: EditorComponentImage
};
