import { TestBed } from '@angular/core/testing';

import { Fila } from './fila.service.ts';

describe('Fila', () => {
  let service: Fila;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fila);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
