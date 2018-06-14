import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable, pipe, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class CommonService {

    constructor(private http: Http) { }

    get(url: string, params?: RequestOptionsArgs) {
        return this.http
            .get(url, params)
            .pipe(
                map((response: Response) => response.json()),
                catchError(this.handleError));
    }

    post(url: string, params?: RequestOptionsArgs) {
        return this.http.post(url, params)
        .pipe(
            map((response: Response) => response.json()),
            catchError(this.handleError));
    }

    upload(url: string, file: File) {
        const formData: FormData = new FormData();
        formData.append(file.name, file, file.name);
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });

        return this.http
            .post(url, formData, options)
            .pipe(
                catchError((e) => this.handleError(e)));
    }

    private handleError(error: Response) {
        let msg = `Status Code is ${error.status} on url ${error.url}`;
        console.error(msg);
        return throwError(msg);

    }

}