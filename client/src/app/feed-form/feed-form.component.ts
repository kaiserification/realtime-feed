import { Component, OnInit, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-feed-form',
  templateUrl: './feed-form.component.html',
  styleUrls: ['./feed-form.component.css'],
  providers: [CategoryService]
})
export class FeedFormComponent implements OnInit {

	private httpClient: HttpClient;

	// private categoryService: CategoryService;
	public categories: Array<Category> = [];

	public name: string;
	public content: string;
	public category: string;

	public isSending: boolean;
	public infoMessage: string;
	public errorMessage: string;
	
	constructor(private http: HttpClient, private categoryService: CategoryService) {
		this.httpClient = http;
	}

	ngOnInit() {
		this.categories = this.categoryService.getCategories();
	}

	submit() {

		this.errorMessage = '';
		this.isSending = true;
		this.infoMessage = 'Requete en cours...';

		this.http.post('http://localhost:3000/submit', {
			title: this.name,
			content: this.content,
			category: this.category
		})
		.toPromise() 
		.then((data: {message: string, status: boolean}) => {
			this.infoMessage = data.message;
			setTimeout(() => {
				this.infoMessage = '';
			}, 1000);
			this.isSending = true;
			this.name = '';
			this.content = '';
			this.category = '';
		})
		.catch(error => {
			this.infoMessage = '';
			this.errorMessage = error.error.message;
			this.isSending = false;
		})
	}
}
