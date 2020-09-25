import { Component, OnInit, ViewChild } from '@angular/core';
import Telegram from 'telegram-send-message';
import { TelegramSendService } from '../service/telegram-send.service';
import { LoginService } from '../service/login.service';
import { SettingsUsersService } from '../service/settings-users.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
declare var $: any;

@Component({
  selector: 'app-telegram-send',
  templateUrl: './telegram-send.component.html',
  styleUrls: ['./telegram-send.component.scss'],
})
export class TelegramSendComponent implements OnInit {

  type_department = 'all';
  department = 'all';
  array_city = ['all'];
  position = 'all'
  array_number_td = ['all']
  textMessage: any

  list_type_department: String[];
  list_people_connected: String[];
  list_people_not_connected: String[];
  list_department: String[];
  list_cities: string[];
  list_position: string[];
  list_number_tt: any[];

  dataSource_connected = new MatTableDataSource();
  dataSource_not_connected = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  all_cities = false;
  booleanTypeOffice = false;
  booleanTypeTradeDot = false;

  @ViewChild('paginator_connected', { static: true }) paginator_connected: MatPaginator;
  @ViewChild('paginator_not_connected', { static: true }) paginator_not_connected: MatPaginator;

  displayedColumns_connected: string[] = [
    'select',
    'id_person',
    'fi',
    'department',
    'type_department',
    'position',
    'status'
  ];

  displayedColumns_not_connected: string[] = [
    'id_person',
    'fi',
    'department',
    'type_department',
    'position',
    'status'
  ];

  TOKEN_id = '1202623405:AAHxtwkptrydHKcKxLRykD9IwF6DdhiKf6k';


  constructor(
    private telegramSendService: TelegramSendService,
    private loginService: LoginService,
    private settingsUserService: SettingsUsersService
  ) {
    this.telegramSendService.telegram_send_get_list_type_department().subscribe(res => {
      this.list_type_department = JSON.parse(res);

    })
    this.telegramSendService.telegram_send_get_list_all_person(this.type_department).subscribe((res) => {
      this.list_people_connected = JSON.parse(res).connected;
      this.list_people_not_connected = JSON.parse(res).not_connected;
      this.dataSource_connected = new MatTableDataSource(this.list_people_connected);
      this.dataSource_not_connected = new MatTableDataSource(this.list_people_not_connected);
      this.dataSource_connected.paginator = this.paginator_connected;
      this.dataSource_not_connected.paginator = this.paginator_not_connected;
      this.selection = new SelectionModel(true, []);
    });
  }


  ngModalChangeTypeDepartmentList() {
    this.telegramSendService.telegram_send_get_list_all_person(this.type_department).subscribe((res) => {
      this.list_people_connected = JSON.parse(res).connected;
      this.list_people_not_connected = JSON.parse(res).not_connected;
      this.dataSource_connected = new MatTableDataSource(this.list_people_connected);
      this.dataSource_not_connected = new MatTableDataSource(this.list_people_not_connected);
      this.dataSource_connected.paginator = this.paginator_connected;
      this.dataSource_not_connected.paginator = this.paginator_not_connected;
      this.selection = new SelectionModel(true, []);
      switch (this.type_department) {
        case 'Торговая точка':
          this.telegramSendService.telegram_send_get_list_cities().subscribe(res => {
            this.list_cities = JSON.parse(res)
            this.booleanTypeOffice = false
            this.booleanTypeTradeDot = true
            this.department = 'all';
          });
          break;
        case 'Офис':
          this.telegramSendService.telegram_send_get_department_list(this.type_department).subscribe((res) => {
            this.list_department = JSON.parse(res);
            this.booleanTypeTradeDot = false
            this.booleanTypeOffice = true
          })
          break;
        case 'all':
          this.booleanTypeTradeDot = false
          this.booleanTypeOffice = false
          break
      }
    });
  }

  ngModalChangeDepartmentOffice() {
    this.telegramSendService.telegram_send_get_department_list_person(this.type_department, this.department).subscribe(res => {
      this.list_people_connected = JSON.parse(res).connected;
      this.list_people_not_connected = JSON.parse(res).not_connected;
      this.dataSource_connected = new MatTableDataSource(this.list_people_connected);
      this.dataSource_not_connected = new MatTableDataSource(this.list_people_not_connected);
      this.dataSource_connected.paginator = this.paginator_connected;
      this.dataSource_not_connected.paginator = this.paginator_not_connected;
      this.selection = new SelectionModel(true, []);
    })
  }

  ngModelChangeAllCities() {
    switch (this.all_cities) {
      case true:
        this.telegramSendService.telegram_send_get_position_td().subscribe(res => {
          this.list_position = JSON.parse(res);
          this.telegramSendService.telegram_send_get_list_all_person(this.type_department).subscribe((res) => {
            this.list_people_connected = JSON.parse(res).connected;
            this.list_people_not_connected = JSON.parse(res).not_connected;
            this.dataSource_connected = new MatTableDataSource(this.list_people_connected);
            this.dataSource_not_connected = new MatTableDataSource(this.list_people_not_connected);
            this.dataSource_connected.paginator = this.paginator_connected;
            this.dataSource_not_connected.paginator = this.paginator_not_connected;
            this.selection = new SelectionModel(true, []);
          })
        })
        break;
      case false:
        this.telegramSendService.telegram_send_get_list_cities().subscribe(res => {
          this.list_cities = JSON.parse(res)
          this.telegramSendService.telegram_send_get_list_all_person(this.type_department).subscribe((res) => {
            this.list_people_connected = JSON.parse(res).connected;
            this.list_people_not_connected = JSON.parse(res).not_connected;
            this.dataSource_connected = new MatTableDataSource(this.list_people_connected);
            this.dataSource_not_connected = new MatTableDataSource(this.list_people_not_connected);
            this.dataSource_connected.paginator = this.paginator_connected;
            this.dataSource_not_connected.paginator = this.paginator_not_connected;
            this.selection = new SelectionModel(true, []);
          })
        })
        break;
    }
  }

  ngModelChangePosition() {
    this.telegramSendService.telegram_send_get_all_person_position(this.type_department, this.position).subscribe(res => {
      this.list_people_connected = JSON.parse(res).connected;
      this.list_people_not_connected = JSON.parse(res).not_connected;
      this.dataSource_connected = new MatTableDataSource(this.list_people_connected);
      this.dataSource_not_connected = new MatTableDataSource(this.list_people_not_connected);
      this.dataSource_connected.paginator = this.paginator_connected;
      this.dataSource_not_connected.paginator = this.paginator_not_connected;
      this.selection = new SelectionModel(true, []);
    })
  }

  ngModelChangeCities() {
    this.telegramSendService.telegram_send_get_list_person_by_cities(this.array_city).subscribe(res => {
      this.list_people_connected = JSON.parse(res).connected === null ? [] : JSON.parse(res).connected
      this.list_people_not_connected = JSON.parse(res).not_connected === null ? [] : JSON.parse(res).not_connected;
      this.list_number_tt = JSON.parse(res).number_td = null ? [] : JSON.parse(res).number_td
      this.dataSource_connected = new MatTableDataSource(this.list_people_connected);
      this.dataSource_not_connected = new MatTableDataSource(this.list_people_not_connected);
      this.dataSource_connected.paginator = this.paginator_connected;
      this.dataSource_not_connected.paginator = this.paginator_not_connected;
      this.selection = new SelectionModel(true, []);
    })
  }

  ngModelChangeNumberTT() {
    this.telegramSendService.telegram_send_get_person_by_number_tt(this.array_number_td).subscribe(res => {
      this.list_people_connected = JSON.parse(res).connected === null ? [] : JSON.parse(res).connected
      this.list_people_not_connected = JSON.parse(res).not_connected === null ? [] : JSON.parse(res).not_connected;;
      this.dataSource_connected = new MatTableDataSource(this.list_people_connected);
      this.dataSource_not_connected = new MatTableDataSource(this.list_people_not_connected);
      this.dataSource_connected.paginator = this.paginator_connected;
      this.dataSource_not_connected.paginator = this.paginator_not_connected;
      this.selection = new SelectionModel(true, []);
    })
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource_connected.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource_connected.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  buttonSendMessage() {
    this.selection.selected.forEach(element => {
      Telegram.setToken(this.TOKEN_id);
      Telegram.setRecipient(element.id_telegram);
      Telegram.setMessage(this.textMessage);
      Telegram.send();
    })
  }

  ngOnInit(): void {
  }


  // send_message_bot() {
  //   console.log(this.department_list_names);
  //   console.log(this.list_name_department_office);
  //   if (this.office === true) {
  //     if (this.department_list_names.length === 0) {
  //       console.log('Нету ни одного ID');
  //       return this.alert_error_danger();
  //     } else {
  //       if (this.list_name_department_office.length === 0) {
  //         this.not_id_chat_office = [];
  //         this.department_list_names.forEach((element) => {
  //           console.log(element);

  //           if (element.id_telegram_chat === '0') {
  //             this.not_id_chat_office.push({
  //               first_name: element.first_name,
  //               last_name: element.last_name,
  //               department: element.department,
  //               id_telegram_chat: element.id_telegram_chat,
  //             });
  //           } else {
  //           }
  //           Telegram.setToken(this.TOKEN_id);
  //           Telegram.setRecipient(element.id_telegram_chat);
  //           Telegram.setMessage(this.message_text.value);
  //           Telegram.send();
  //         });

  //         if (this.not_id_chat_office.length !== 0) {
  //           console.log(this.not_id_chat_office);
  //           return this.alert_error();
  //         } else {
  //           $('#successfully_sent').modal('show');
  //           setTimeout(function () {
  //             $('#successfully_sent').modal('hide');
  //           }, 2000);
  //         }
  //       } else if (this.all_sends_office === true) {
  //         this.not_id_chat_office = [];
  //         this.all_users_department_office.forEach((element) => {
  //           console.log(element);

  //           if (element.id_telegram_chat === '0') {
  //             this.not_id_chat_office.push({
  //               first_name: element.first_name,
  //               last_name: element.last_name,
  //               position: element.position,
  //               department: element.department,
  //               id_telegram_chat: element.id_telegram_chat,
  //             });
  //           } else {
  //           }
  //           Telegram.setToken(this.TOKEN_id);
  //           Telegram.setRecipient(element.id_telegram_chat);
  //           Telegram.setMessage(this.message_text.value);
  //           Telegram.send();
  //         });

  //         if (this.not_id_chat_office.length !== 0) {
  //           console.log(this.not_id_chat_office);
  //           return this.alert_error();
  //         } else {
  //           $('#successfully_sent').modal('show');
  //           setTimeout(function () {
  //             $('#successfully_sent').modal('hide');
  //           }, 2000);
  //         }
  //       } else {
  //         console.log(this.list_name_department_office);
  //         this.not_id_chat_office = [];
  //         this.list_name_department_office.forEach((element) => {
  //           console.log(element);

  //           if (element.id_telegram_chat === '0') {
  //             this.not_id_chat_office.push({
  //               first_name: element.first_name,
  //               last_name: element.last_name,
  //               department: element.department,
  //               id_telegram_chat: element.id_telegram_chat,
  //             });
  //           } else {
  //           }
  //           Telegram.setToken(this.TOKEN_id);
  //           Telegram.setRecipient(element.id_telegram_chat);
  //           Telegram.setMessage(this.message_text.value);
  //           Telegram.send();
  //         });

  //         if (this.not_id_chat_office.length !== 0) {
  //           console.log(this.not_id_chat_office);
  //           return this.alert_error();
  //         } else {
  //           $('#successfully_sent').modal('show');
  //           setTimeout(function () {
  //             $('#successfully_sent').modal('hide');
  //           }, 2000);
  //         }
  //       }
  //     }
  //     return;
  //   }
  //   if (this.trade_dot === true) {
  //     if (this.message_text.invalid) {
  //       console.log('message_text.invalid');
  //       return this.message_text.markAsTouched();
  //     }
  //     this.telegramSendService
  //       .get_data_send_bot(this.department.value)
  //       .subscribe((res) => {
  //         console.log(res);
  //         this.id_telegram_bot_pdp = JSON.parse(res);
  //         if (this.id_telegram_bot_pdp === null) {
  //           console.log('Нету ни одного ID');
  //           return this.alert_error_danger();
  //         } else {
  //           this.not_id_chat_trade_dot = [];
  //           this.id_telegram_bot_pdp.forEach((element) => {
  //             console.log(element.id_telegram_chat);
  //             if (element.id_telegram_chat === '0') {
  //               this.not_id_chat_trade_dot.push({
  //                 first_name: element.first_name,
  //                 last_name: element.last_name,
  //                 department: element.department,
  //                 id_telegram_chat: element.id_telegram_chat,
  //               });
  //             }
  //             Telegram.setToken(this.TOKEN_id);
  //             Telegram.setRecipient(element.id_telegram_chat);
  //             Telegram.setMessage(this.message_text.value);
  //             Telegram.send();
  //           });
  //           $('#successfully_sent').modal('show');
  //           setTimeout(function () {
  //             $('#successfully_sent').modal('hide');
  //           }, 2000);
  //           console.log(this.not_id_chat_trade_dot);
  //         }
  //       });
  //     return;
  //   }
  // }

}
