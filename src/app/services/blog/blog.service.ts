import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Injectable } from '@angular/core';  
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = environment.apiUrl;

  private httpOptions = { 
  };
  constructor(private http: HttpClient) { }

  SubmitBlog(formData: FormData): Observable<any> {
    debugger
    const id = formData.get('id');
       if (id !== null || id !== '0') 
      {
        const url = `${environment.apiUrl}${environment.endpoints.updateBlog}`; 
        return this.http.put<any>(`${url}?id=${id}`, formData, {
          headers: new HttpHeaders({
            // 'Content-Type': 'multipart/form-data', // Do NOT set this header, it's handled automatically
          })
        });
      }
      else
      {
        const url = `${environment.apiUrl}${environment.endpoints.createBlog}`; 
        return this.http.post<any>(url, formData, {
          headers: new HttpHeaders({
            // 'Content-Type': 'multipart/form-data', // Do NOT set this header, it's handled automatically
          })
        });
      }  
  } 

  GetAllBlog(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetAllBlog`, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Get'))
    );
  }

  GetAllBlogByUserId(userId: bigint): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetAllBlogByUserId?UserId=${userId}`, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Get'))
    );
  }

  GetActiveBlog(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetActiveBlog`, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Get'))
    );
  }

  GetBlogById(blogId: bigint): Observable<any[]> {
    debugger
    const url = `${environment.apiUrl}${environment.endpoints.getBlogById}`; 
    return this.http.get<any>(`${url}?id=${blogId}`, this.httpOptions).pipe(
      tap((response: any) => {
        debugger
      }),
      catchError(this.handleError<any>('Get'))
    );
  }

  ChangeStatus(blogId: bigint): Observable<any[]> {
    console.log("ChangeStatus blogId " + blogId);
    return this.http.post<any>(`${this.apiUrl}/ChangeBlogStatus?BlogId=${blogId}`, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Get'))
    );
  }

  GetBlogDetailById(blogId: bigint): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetBlogDetailById?BlogId=${blogId}`, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Get'))
    );
  }

  SaveBlogComment(model: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/SaveBlogComment`, model, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Post'))
    );
  }
  
  GetBlogCommentById(blogId: bigint): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetBlogCommentById?BlogId=${blogId}`, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Get'))
    );
  }

  GetRelatedBlog(blogId: bigint, categoryId : bigint): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetRelatedBlog?BlogId=${blogId}&CategoryId=${categoryId}`, this.httpOptions).pipe(
      tap((response: any) => {
      }),
      catchError(this.handleError<any>('Get'))
    );
  }

  GetPagedBlogList(page: number, pageSize: number, userId:any, searchQuery: string): Observable<HttpResponse<any>> { 
    let params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', pageSize);
    
    if (searchQuery) {
      params = params.set('SearchQuery', searchQuery);
    }
    var url = `${environment.apiUrl}${environment.endpoints.getAllBlogsList}`; 
    if(userId > 0)
    {
      url = `${environment.apiUrl}${environment.endpoints.getBlogsList}`; 
    }
    return this.http.get<any>(url, { params, observe: 'response' });
  }

  private log(message: string) {
    console.log(new Date() + ': ' + JSON.stringify(message));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };                                                                                  
  }
}
