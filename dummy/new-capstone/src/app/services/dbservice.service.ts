import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  baseURL: string = "http://127.0.0.1:8000/api";  // Django API

  constructor(public httpObj: HttpClient) { }

  getRecord(tableName: string) {
    return this.httpObj.get(`${this.baseURL}/${tableName}/`); // Trailing slash for DRF
  }

  deleteRecord(tableName: string, id: number | string ) {
    return this.httpObj.delete(`${this.baseURL}/${tableName}/${id}/`); // ID requires trailing slash
  }

  addRecord(tableName: string, body: any) {
    return this.httpObj.post(`${this.baseURL}/${tableName}/`, body);
  }

  getSingleRecord(tableName: string, id: number) {
    return this.httpObj.get(`${this.baseURL}/${tableName}/${id}/`);
  }

  updateRecord(tableName: string, id: number, body: any) {
    return this.httpObj.put(`${this.baseURL}/${tableName}/${id}/`, body);
  }
}
