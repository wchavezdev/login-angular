import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ClientModalComponent } from '../../components/client-modal/client-modal.component';
import { ClientService } from '../../client.service';
import { Cliente } from '../../interfaces/Cliente';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  displayedColumns: string[] = [
    'cedula',
    'nombres',
    'apellidos',
    'direccion',
    'edad',
    'actions',
  ];

  get dataSource() {
    return this.clientService.dataSource;
  }

  constructor(
    private dialog: MatDialog,
    private clientService: ClientService
  ) {}

  ngOnInit() {}

  openClientModal(client?: Cliente) {
    this.dialog.open(ClientModalComponent, {
      width: '360px',
      data: client || null,
    });
  }

  openConfirmModal(client: Cliente) {
    this.dialog.open(ConfirmModalComponent, {
      width: '360px',
      data: client,
    });
  }
}
