import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit {
  @Input('title') title = 'Image Viewer';
  @Input('image') selectedImage: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
