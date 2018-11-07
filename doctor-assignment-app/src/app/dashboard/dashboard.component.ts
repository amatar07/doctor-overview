import { Component } from '@angular/core';
import { DoctorOverviewService } from '../../common/services/doctor-overview.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  //saving our main object retrieved from service
  allDoctorData: any;
  //savinf all specialities to be able to filter through
  allDoctorSpeciality: any;

  /**
   * Entered once component is initialized
   * @param doctorOverviewService common service to retrieve doctors information
   */
  constructor(private doctorOverviewService: DoctorOverviewService) {
    this.doctorOverviewService.getAllDoctors().subscribe(response => {
      this.allDoctorData = response;
      this.determineSpeciality();
    });

    this.doctorOverviewService.getAllSpecialities().subscribe(response => {
      this.allDoctorSpeciality = response;
    });
  }

  /**
   * Adding to our current object the specialities as names
   */
  determineSpeciality() {

    for (let doctorIndex in this.allDoctorData) {

      if (this.allDoctorData[doctorIndex].main_speciality) {
        let speciality = this.allDoctorSpeciality.find(x => x.id == this.allDoctorData[doctorIndex].main_speciality);
        this.allDoctorData[doctorIndex].main_speciality_name = speciality.name;
      }
      if (this.allDoctorData[doctorIndex].specialities) {
        this.allDoctorData[doctorIndex].specialitiesName = [];
        for (let index in this.allDoctorData[doctorIndex].specialities) {
          let speciality = this.allDoctorSpeciality.find(x => x.id == this.allDoctorData[doctorIndex].specialities[index]);
          this.allDoctorData[doctorIndex].specialitiesName[index] = speciality.name;
        }
      }
    }
  }

}
