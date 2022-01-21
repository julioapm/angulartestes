import { TestBed } from '@angular/core/testing';
import { ViacepService, Address } from './viacep.service';
import { RestapiService } from './restapi.service';
import { asyncData, asyncError } from '../utils/testutils';

//Teste unitário do serviço ViacepService
//Usando o serviço RestapiService através de um mock implementado por um spy da API do Jasmine
describe('ViacepService', () => {
  let service: ViacepService;
  let restapiServiceSpy: jasmine.SpyObj<RestapiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('RestapiService', ['get']);
    TestBed.configureTestingModule({
      providers: [
        ViacepService,
        { provide: RestapiService, useValue: spy }
      ]
    });
    service = TestBed.inject(ViacepService);
    restapiServiceSpy = TestBed.inject(RestapiService) as jasmine.SpyObj<RestapiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAddress', () => {
    it('should call RestapiService.get and return an object', (done) => {
      //Dados mockados
      const cep = '01001000';
      const expectedAddress: Address = {
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: 'São Paulo',
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107'
      };
      //Configurando mock do service
      //Utiliza método auxiliar de /utils/testutils
      restapiServiceSpy.get.and.returnValue(asyncData(expectedAddress));
      //Realizando o teste e verificando o resultado esperado da resposta
      service.getAddress(cep).subscribe({
        next: data => {
          expect(data).toEqual(expectedAddress);
          done();
        },
        error: err => done.fail(err.message)
      });
      //Verificando o resultado esperado do spy
      expect(restapiServiceSpy.get).toHaveBeenCalledTimes(1);
      expect(restapiServiceSpy.get).toHaveBeenCalledWith(`https://viacep.com.br/ws/${cep}/json/`);
    });

    it('should return an error when the server returns a 400', (done) => {
      //Dados mockados
      const cep = '0';
      const expectedError = new Error('O servidor retornou o erro: 400 Bad Request');
      //Configurando mock do service
      //Utiliza método auxiliar de /utils/testutils
      restapiServiceSpy.get.and.returnValue(asyncError(expectedError));
      //Realizando o teste e verificando o resultado esperado da resposta
      service.getAddress(cep).subscribe({
        error: err => {
          expect(err).toEqual(expectedError);
          done();
        },
        next: data => done.fail('should have failed with the 400 error')
      });
      //Verificando o resultado esperado do spy
      expect(restapiServiceSpy.get).toHaveBeenCalledTimes(1);
      expect(restapiServiceSpy.get).toHaveBeenCalledWith(`https://viacep.com.br/ws/${cep}/json/`);
    });
  });
});
