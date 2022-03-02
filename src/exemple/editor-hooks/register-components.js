import {useComponents} from "../../hooks/editor-components";

import MyBuilderComponent from "../editor-components/builder/MyComponent.vue";
import MyUiComponent from "../editor-components/ui/MyComponent.vue";
import MyComponentImage from '../assets/my-component.png';

import BuilderCardList from "../editor-components/builder/CardList.vue";
import UICardList from "../editor-components/ui/CardList.vue";
import CardListImage from '../assets/card-list.png';

const { register } = useComponents();

const defaultData = {
	text: '',
	texts: [],
	checked: true,
	select: 'tata'
};

const defaultCardList = {
	cards: []
}

export const registerComponents = () => {
	register({
		title: 'Composant de test',
		category: 'Test',
		builderComponent: MyBuilderComponent,
		uiComponent: MyUiComponent,
		data: defaultData,
		imagePreview: MyComponentImage,
		recursive: true
	});

	register({
		title: 'Liste de cartes',
		category: 'Contenus',
		builderComponent: BuilderCardList,
		uiComponent: UICardList,
		data: defaultCardList,
		imagePreview: CardListImage,
		recursive: false
	})

	/*register({
		title: 'My component 2',
		category: 'Content 2',
		builderComponent: MyBuilderComponent,
		uiComponent: MyUiComponent,
		data: defaultData
	});

	register({
		title: 'My component 3',
		category: 'Content',
		builderComponent: MyBuilderComponent,
		uiComponent: MyUiComponent,
		data: defaultData
	});

	register({
		title: 'My component 4',
		category: 'Content 2',
		builderComponent: MyBuilderComponent,
		uiComponent: MyUiComponent,
		data: defaultData
	});

	register({
		title: 'My component 5',
		category: 'Content 3',
		builderComponent: MyBuilderComponent,
		uiComponent: MyUiComponent,
		data: defaultData
	});

	register({
		title: 'My Component 6',
		category: 'Content',
		builderComponent: MyBuilderComponent,
		uiComponent: MyUiComponent,
		data: defaultData
	});

	register({
		title: 'My component 7',
		category: 'Content 2',
		builderComponent: MyBuilderComponent,
		uiComponent: MyUiComponent,
		data: defaultData
	});

	register({
		title: 'My component 8',
		category: 'Content',
		builderComponent: MyBuilderComponent,
		uiComponent: MyUiComponent,
		data: defaultData
	});

	register({
		title: 'My component 9',
		category: 'Content 2',
		builderComponent: MyBuilderComponent,
		uiComponent: MyUiComponent,
		data: defaultData
	});

	register({
		title: 'My component 10',
		category: 'Content 3',
		builderComponent: MyBuilderComponent,
		uiComponent: MyUiComponent,
		data: defaultData
	});

	register({
		title: 'My Component 11',
		category: 'Content',
		builderComponent: MyBuilderComponent,
		uiComponent: MyUiComponent,
		data: defaultData
	});

	register({
		title: 'My component 12',
		category: 'Content 2',
		builderComponent: MyBuilderComponent,
		uiComponent: MyUiComponent,
		data: defaultData
	});

	register({
		title: 'My component 13',
		category: 'Content',
		builderComponent: MyBuilderComponent,
		uiComponent: MyUiComponent,
		data: defaultData
	});

	register({
		title: 'My component 14',
		category: 'Content 2',
		builderComponent: MyBuilderComponent,
		uiComponent: MyUiComponent,
		data: defaultData
	});

	register({
		title: 'My component 15',
		category: 'Content 3',
		builderComponent: MyBuilderComponent,
		uiComponent: MyUiComponent,
		data: defaultData
	});*/
};
