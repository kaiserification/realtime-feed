export class CategoryService {

	private categories = [
		{name: 'Sport'},
		{name: 'Lecture'},
		{name: 'Danse'},
		{name: 'Science'},
		{name: 'Musique'},
	];

	getCategories() {
		return this.categories;
	}
}