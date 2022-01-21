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
      const expectedErrorMessage = 'O servidor retornou o erro: 404 Not Found';
      tratadorDeErros(error).subscribe({
        complete: () => done.fail('should have failed with the 404 error'),
        error: (err) => {
          expect(err.message).toEqual(expectedErrorMessage);
          done();
        }
      });
    });

    it('should throw an error object when EventError', (done) => {
      const error = new HttpErrorResponse({
        error: new ErrorEvent('Network error', { message: 'test' })
      });
      const expectedErrorMessage = 'Ocorreu um erro: test';
      tratadorDeErros(error).subscribe({
        complete: () => done.fail('should have failed with network error'),
        error: (err) => {
          expect(err.message).toEqual(expectedErrorMessage);
          done();
        }
      });
    });
  });
});
