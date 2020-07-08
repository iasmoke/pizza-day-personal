import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private http: HttpClient
  ) { }

  get_table_main() {
    return this.http.post(
      './assets/php/main_table_get.php',
      JSON.stringify(
        {}
      ),
      { responseType: 'text' }
    );
  }

  get_table_main_user_hr(user_name_create_employee) {
    return this.http.post(
      './assets/php/user_hr_main_table_get.php',
      JSON.stringify(
        {
          user_name_create_employee: user_name_create_employee
        }
      ),
      { responseType: 'text' }
    );
  }


  add_employee(new_form, date_now, user_name_create_employee) {
    console.log(new_form);
    return this.http.post(
      './assets/php/main_add_employee.php',
      JSON.stringify(
        {
          new_form: new_form,
          date_now: date_now,
          user_name_create_employee: user_name_create_employee
        }
      ),
      { responseType: 'text' }
    );
  }

  user_hr_add_employee(new_form_employee, date_now, user_name_create_employee) {
    console.log(new_form_employee);
    return this.http.post(
      './assets/php/user_hr_main_add_employee.php',
      JSON.stringify(
        {
          new_form_employee: new_form_employee,
          date_now: date_now,
          user_name_create_employee: user_name_create_employee
        }
      ),
      { responseType: 'text' }
    );
  }
  get_data_employee(id_personal) {
    return this.http.post(
      './assets/php/main_get_data_employee.php',
      JSON.stringify(
        {
          id_personal: id_personal
        }
      ),
      { responseType: 'text' }
    );
  }
  update_employee(user_name, form_edit_employee, id_personal, date_now) {
    return this.http.post(
      './assets/php/main_update_employee.php',
      JSON.stringify(
        {
          user_name: user_name,
          form_edit_employee: form_edit_employee,
          id_personal: id_personal,
          date_now: date_now
        }
      ),
      { responseType: 'text' }
    );
  }

  user_hr_update_employee(user_name, form_edit_employee, id_personal, date_now) {
    return this.http.post(
      './assets/php/user_hr_main_update_employee.php',
      JSON.stringify(
        {
          user_name: user_name,
          form_edit_employee: form_edit_employee,
          id_personal: id_personal,
          date_now: date_now
        }
      ),
      { responseType: 'text' }
    );
  }

  user_hr_get_data_update(id_personal) {
    return this.http.post(
      './assets/php/user_hr_main_get_data_update.php',
      JSON.stringify(
        {
          id_personal: id_personal
        }
      ),
      { responseType: 'text' }
    );
  }
  get_id_tt() {
    return this.http.post(
      './assets/php/get_id_tt.php',
      JSON.stringify(
        {
        }
      ),
      { responseType: 'text' }
    );
  }

  user_mt_get_table_main() {
    return this.http.post(
      './assets/php/user_mt_main_table_get.php',
      JSON.stringify(
        {}
      ),
      { responseType: 'text' }
    );
  }
}