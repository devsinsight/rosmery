import { Component } from '@angular/core';
import { CommonService } from './common/common.service';
import 'bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  fileToUpload: File = null;

  constructor(private commonService: CommonService){ }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    console.log("hey! click!")
    this.commonService.upload("http://localhost:62879/api/values/upload", this.fileToUpload)
      .subscribe()
  }
}
