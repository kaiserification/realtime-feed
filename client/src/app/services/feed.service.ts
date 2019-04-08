import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Feed } from '../models/feed.model';
import Pusher from 'pusher-js';


@Injectable({
	providedIn: 'root'
})

export class FeedService {
	private subject: Subject<Feed> = new Subject<Feed>();
	private pusherClient: Pusher;

	constructor() {
		this.pusherClient = new Pusher('dd4e505a997e49aee170', {cluster: 'eu'});
		
		const channel = this.pusherClient.subscribe('realtime-feeds');

		channel.bind('posts', (data: {title: string, body: string, time: string, category: string}) => {
			this.subject.next(new Feed(data.title, data.body, new Date(data.time).toLocaleString(), data.category));
		});
	}

	getItemFeeds(): Observable<Feed> {
		return this.subject.asObservable();
	}
}