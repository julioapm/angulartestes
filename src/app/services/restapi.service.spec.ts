import { TestBed } from '@angular/core/testing';
import { RestapiService } from './restapi.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observer } from 'rxjs';

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
    const dummyResponse: Dummy = {
      name: 'test',
      age: 10
    };

    it('should return an Observable<Dummy>', () => {
      restapiService.get<Dummy>('/test').subscribe(data => expect(data).toEqual(dummyResponse));
      const req = httpTestingController.expectOne('/test');
      expect(req.request.method).toEqual('GET');
      req.flush(dummyResponse);
    });

  });
});

interface Dummy {
  name: string,
  age: number
}
