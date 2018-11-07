import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DoctorOverviewService {
  //Base Url to be added to all links
  //URLs should be seperated to a different file
  private baseUrl = 'https://demo-tcc.teleclinic.de';
  allDoctors: any;
  allSpecialities: any;
  constructor(private http: HttpClient) {

  }

  /**
   * Retrieving all doctors from backend
   */
  getAllDoctors() {

    let url = this.baseUrl + '/v2/staff/doctors/';
    return this.http.get(url).pipe(map((response) => {
      this.allDoctors = response;
      for (let doctorIndex in this.allDoctors) {
        this.getDoctorAccount(this.allDoctors[doctorIndex].account, doctorIndex);
        this.getDoctorProfile(this.allDoctors[doctorIndex].account, doctorIndex);
      }
      return this.allDoctors;
    }));
  }

  /**
   * Retrieving all specialities in backend
   */
  getAllSpecialities() {
    let url = this.baseUrl + '/v2/entity-collection/specialities/';
    return this.http.get(url).pipe(map((response) => {
      return this.allSpecialities = response;
    }));
  }

  /**
   * Retrieving additonal information about user and adding it to our main object
   * @param id userId from the backend
   * @param doctorIndex index of our current object
   */
  getDoctorAccount(id: any, doctorIndex) {
    let url = this.baseUrl + `/v2/account-management/accounts/${id}/`;
    this.http.get(url).subscribe((response) => {
      this.allDoctors[doctorIndex].details = response;
    });
  }

  /**
   * Retrieving additonal information about user and adding it to our main object
   * @param id userId from the backend
   * @param doctorIndex index for out current object
   */
  getDoctorProfile(id: any, doctorIndex) {
    let url = this.baseUrl + `/v2/account-management/accounts/${id}/profiles/${id}/`;
    this.http.get(url).subscribe(
      (response) => {
        this.allDoctors[doctorIndex].profile = response;
      });

  }


}
