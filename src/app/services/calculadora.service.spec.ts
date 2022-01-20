import { TestBed } from '@angular/core/testing';
import { CalculadoraService } from './calculadora.service';

//Teste unitário utilizando Jasmine e suporte dos utilitários de teste do Angular
describe('CalculadoraService', () => {
  let service: CalculadoraService;

  beforeEach(() => {
    //TestBed define um módulo de teste que emula um @NgModule
    TestBed.configureTestingModule({});
    //ou fornecendo o provedor do serviço explicitamente
    //TestBed.configureTestingModule({ providers: [CalculadoraService] });
    service = TestBed.inject(CalculadoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate 0 + 0 = 0', () => {
    const soma = service.somar(0, 0);
    expect(soma).toEqual(0);
  });

  it('should calculate 0 + 1 = 1', () => {
    const soma = service.somar(0, 1);
    expect(soma).toEqual(1);
  });

  it('should calculate 1 + 0 = 1', () => {
    const soma = service.somar(1, 0);
    expect(soma).toEqual(1);
  });

});
