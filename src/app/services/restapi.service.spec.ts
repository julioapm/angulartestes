import { TestBed } from '@angular/core/testing';
import { RestapiService } from './restapi.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

//Teste unitário utilizando Jasmine e suporte dos utilitários de teste do Angular
//Para testar chamadas HTTP utiliza-se HttpClientTestingModule e HttpTestingController
describe('RestapiService', () => {
  let restapiService: RestapiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    //Configurando TestBed com as dependências
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestapiService]
    });
    //Injetando as dependências
    restapiService = TestBed.inject(RestapiService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    //Garantindo que não exitem requisições HTTP pendentes
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(restapiService).toBeTruthy();
  });

  describe('#get', () => {});
});
