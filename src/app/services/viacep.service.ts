import { Injectable } from '@angular/core';
import { RestapiService } from './restapi.service';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {
  private url = 'https://viacep.com.br/ws/';

  constructor(private api: RestapiService) { }

  getAddress(cep: string) {
    return this.api.get<Address>(`${this.url}${cep}/json/`);
  }
}

export interface Address {
  cep:         string;
  logradouro:  string;
  complemento: string;
  bairro:      string;
  localidade:  string;
  uf:          string;
  ibge:        string;
  gia:         string;
  ddd:         string;
  siafi:       string;
}
