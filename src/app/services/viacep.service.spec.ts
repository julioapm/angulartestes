import { TestBed } from '@angular/core/testing';
import { ViacepService } from './viacep.service';
import { RestapiService } from './restapi.service';
import { asyncData, asyncError } from '../utils/testutils';

//Teste unitário do serviço ViacepService
//Usando o serviço RestapiService através de um mock implementado por um spy da API do Jasmine
describe('ViacepService', () => {
  let service: ViacepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViacepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getAddress', () => {});
});
