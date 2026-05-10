import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'http://localhost:8080/api/items';

    private itemUrl = 'http://localhost:8080/item/upload';



  constructor(private http: HttpClient) {}


  updateStatus(itemId: number, status: string) {
    const token = localStorage.getItem('token');

  const body = {
    itemId: itemId,
    status: status
  };

  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

  return this.http.put(
    `http://localhost:8080/api/items/status`,
    body, {headers}
  );

}

  getItemsByType(itemType: string) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  return this.http.get<any>(
    `${this.apiUrl}/type/${itemType}`, {headers});
}


  getAllItems(): Observable<any[]> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  
  getAllItemsByUser(): Observable<any[]> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any[]>(this.apiUrl+'/user', { headers });
  }

  reportItem(item: any): Observable<any> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(
      this.itemUrl,
      item,
      { headers }
    );
  }

  searchItems(itemName: string, locationId: number | null) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

     const body = {
    title: itemName,
    locationId: locationId
  };

  return this.http.post<any[]>(
    `http://localhost:8080/api/items/search`,body, {headers}
  );
}

  deleteItem(id: number): Observable<any> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      { headers }
    );
  }
}