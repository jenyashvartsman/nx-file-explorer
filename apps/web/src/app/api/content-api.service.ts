import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentDto } from '@libs/dto';

@Injectable({
  providedIn: 'root',
})
export class ContentApiService {
  private readonly API_BASE_URL = 'http://localhost:3000/api/content';

  private readonly http = inject(HttpClient);

  getContent(path: string): Observable<ContentDto> {
    return this.http.get<ContentDto>(this.API_BASE_URL, {
      params: { path },
    });
  }
}
