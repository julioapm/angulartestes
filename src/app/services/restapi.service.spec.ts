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

  describe('get', () => {
    it('should return an Observable<Dummy>', () => {
      //Dados mockados
      const response: Dummy = {
        name: 'test',
        age: 10
      };
      //Resultado a ser obtido
      let actualResponse: Dummy | undefined;
      //Realizando o teste
      restapiService.get<Dummy>('/test').subscribe(data => actualResponse = data);
      //Mockando o HTTP
      const req = httpTestingController.expectOne('/test');
      req.flush(response); //Disparando a resposta do HTTP mockado
      //Verificando o resultado esperado
      expect(req.request.method).toEqual('GET');
      expect(actualResponse).toEqual(response);
    });

    it('should return an error when the server returns a 404', () => {
      //Dados mockados
      const status = 404;
      const statusText = 'Not Found';
      const progressEvent = new ProgressEvent('API error');
      //Resultado a ser obtido
      let actualError: any = undefined;
      //Realizando o teste
      restapiService.get<Dummy>('/test').subscribe({
        next: (data) => fail('next handler must not be called'),
        error: (err) => actualError = err,
        complete: () => fail('complete handler must not be called')
      });
      //Mockando o HTTP
      const req = httpTestingController.expectOne('/test');
      req.error(progressEvent, {status, statusText}); //Gerando uma resposta HTTP de erro
      //Verificando o resultado esperado
      if (!actualError) {
        throw new Error('Error needs to be defined');
      }
      expect(req.request.method).toEqual('GET');
      expect(actualError.message).toEqual('O servidor retornou o erro: 404 Not Found')
    });
  });
});

interface Dummy {
  name: string,
  age: number
}
