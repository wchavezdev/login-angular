import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { clientes as seedClients } from './data/clients';
import { Cliente } from './interfaces/Cliente';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private _clientes: Cliente[] = seedClients;
  public dataSource = new ClientDataSource(seedClients);

  public get clientes(): Cliente[] {
    return this._clientes;
  }

  constructor() {}

  public filterClients(filterValue: string): void {
    this._clientes = this._clientes.filter(
      (cliente) =>
        cliente.cedula.toLowerCase().includes(filterValue) ||
        cliente.nombres.toLowerCase().includes(filterValue) ||
        cliente.apellidos.toLowerCase().includes(filterValue) ||
        cliente.direccion.toLowerCase().includes(filterValue) ||
        cliente.edad.toString().includes(filterValue)
    );

    this.dataSource.setData(this._clientes);
  }

  public addClient(newClient: Cliente): void {
    this._clientes.push(newClient);

    this.dataSource.setData(this._clientes);
  }

  public deleteClient(cedula: string): void {
    this._clientes = this._clientes.filter(
      (cliente) => cliente.cedula !== cedula
    );

    this.dataSource.setData(this._clientes);
  }

  public updateClient(updatedCliente: Cliente): void {
    this._clientes = this._clientes.map((cliente) =>
      cliente.cedula === updatedCliente.cedula ? updatedCliente : cliente
    );

    this.dataSource.setData(this._clientes);
  }
}

class ClientDataSource extends DataSource<Cliente> {
  private _dataStream = new ReplaySubject<Cliente[]>();

  constructor(initialData: Cliente[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Cliente[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Cliente[]) {
    this._dataStream.next(data);
  }
}
