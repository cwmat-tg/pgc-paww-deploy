import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { humanizeBytes, UploaderOptions, UploadFile, UploadInput, UploadOutput } from 'ngx-uploader';
import { UserMessages } from 'src/app/_shared/models/user-messages.model';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  // Config
  files: File[] = [];
  maxAllowableSize = 2.5e+7;
  currentSize = 0;

  // Outputs
  @Output() error: EventEmitter<string> = new EventEmitter();

	onSelect(event: NgxDropzoneChangeEvent) {
    debugger;
		console.log(event);
    let loadSize = event.addedFiles.reduce((a: any, b: any) => {
      return a + b['size'];
    }, 0);
    loadSize += this.currentSize;

    if (loadSize <= this.maxAllowableSize) {
      this.files.push(...event.addedFiles);
      this.currentSize = loadSize;
    } else {

      console.log(UserMessages.UploadTooLarge);
      this.errorOccured(UserMessages.UploadTooLarge);
    }

    if (event.rejectedFiles?.length > 0) {
      console.log(UserMessages.UploadWrongType);
      this.errorOccured(UserMessages.UploadWrongType);
    }
	}

	onRemove(event: any) {
    debugger;
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
    this.currentSize -= event?.size;
	}

  onFilesAdded() {
    this.readFile(this.files[0]).then(fileContents => {
      // Put this string in a request body to upload it to an API.
      debugger;
      console.log(fileContents);
    });
  }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = e => {
        // @ts-ignore
        return resolve((e.target as FileReader).result);
      };
  
      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };
  
      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }
  
      reader.readAsDataURL(file);
    });
  }

  public fileToBase64 = (file:File):Promise<string> => {
    return new Promise<string> ((resolve,reject)=> {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          // @ts-ignore
          reader.onload = () => resolve(reader.result.toString());
          reader.onerror = error => reject(error);
      })
  }

  private errorOccured(message: string) {
    this.error.emit(message);
  }

}
