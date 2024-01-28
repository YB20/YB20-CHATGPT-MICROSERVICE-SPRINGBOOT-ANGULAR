import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  constructor(private httpClient: HttpClient) { }


  public generateToken(request:HttpRequest<any>) {
    return this.httpClient.post<string>("http://localhost:9192/authenticate", request, {  responseType: 'text' as 'json' });
  }


  public welcome(token:any) {
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<string>("http://localhost:9192/", {headers, responseType: 'text' as 'json' });
  }

  public sendPromptWithToken(prompt: string, token: any) {
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    const params = new HttpParams().set('prompt', prompt);
    return this.httpClient.get<string>("http://localhost:9192/bot/chat", { headers, params, responseType: 'text' as 'json' });
}

}
