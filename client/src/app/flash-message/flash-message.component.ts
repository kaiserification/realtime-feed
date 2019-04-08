import { Component, Input } from '@angular/core';



@Component({
	selector: 'flash-message',
	templateUrl: './flash-message.component.html'
})

export class FlashMessageComponent {
	@Input() type: string;
	@Input() message: string;
}