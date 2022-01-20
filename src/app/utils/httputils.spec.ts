import { HttpErrorResponse } from '@angular/common/http';
import { tratadorDeErros } from './httputils';

//Teste unitário utilizando Jasmine
describe('Util helper functions', () => {
  describe('tratadorDeErros', () => {
    it('should throw an error object when HttpError', (done) => {
      const error = new HttpErrorResponse({
        error: 'test',
        status: 404,
        statusText: 'Not Found'
      });
      const expectedError = {
        erro: 'test',
        mensagem: 'O servidor retornou o erro: 404 Not Found',
        mensagemOriginal: 'Http failure response for (unknown url): 404 Not Found'
      };
      tratadorDeErros(error).subscribe({
        complete: () => done.fail('should have failed with the 404 error'),
        error: (err) => {
          expect(err).toEqual(expectedError);
          done();
        }
      });
    });

    it('should throw an error object when EventError', (done) => {
      const error = new HttpErrorResponse({
        error: new ErrorEvent('Network error', { message: 'test' })
      });
      const expectedError = {
        erro: new ErrorEvent('Network error', { message: 'test' }),
        mensagem: 'Ocorreu um erro: test',
        mensagemOriginal: 'Http failure response for (unknown url): undefined undefined'
      };
      tratadorDeErros(error).subscribe({
        complete: () => done.fail('should have failed with network error'),
        error: (err) => {
          expect(err).toEqual(expectedError);
          done();
        }
      });
    });
  });
});
