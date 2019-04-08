import { Component, OnInit, OnDestroy} from '@angular/core';
import { Feed } from '../models/feed.model';
import { FeedService } from '../services/feed.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  providers: [FeedService],
})
export class FeedComponent implements OnInit, OnDestroy {

	public feeds: Feed[] = [];
	public feedSubscription: Subscription;

	constructor(private feedService: FeedService) {
		this.feedSubscription = feedService.getItemFeeds().subscribe((feed: Feed) => {
			this.feeds.push(feed);
		})
	}

	ngOnInit() {
	}


	ngOnDestroy() {
		this.feedSubscription.unsubscribe();
	}

}
