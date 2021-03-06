import { SpecificationSearchDetailComponent } from './specification-search-detail.component';
import {SpecificationService} from '../specification.service';
import {instance, mock, verify, when} from 'ts-mockito';
import {ActivatedRoute} from '@angular/router';
import {Specification} from '../models/specification';
import {from} from 'rxjs/index';

describe('SpecificationSearchDetailComponent', () => {
  let specificationSearchDetailComponent: SpecificationSearchDetailComponent;
  const mockedSpecificationService = mock(SpecificationService);
  const specificationService = instance(mockedSpecificationService);
  const mockedActivatedRoute = mock(ActivatedRoute);
  const activatedRoute = instance(mockedActivatedRoute);
  const specifications = [new Specification('b0fb472d-bee2-47b6-8ecf-ee5e1e76e990', 'Test', 'Description', '1.0', 'Content', null)];

  beforeEach(() => {
    specificationSearchDetailComponent = new SpecificationSearchDetailComponent(specificationService, activatedRoute);
  });

  it('should show specifications', () => {
    when(mockedSpecificationService.searchSpecifications('Search String')).thenReturn(from([specifications]));

    const event = new KeyboardEvent('keyup', {
      code: '13'
    });

    specificationSearchDetailComponent.searchSpecifications(event).then(() => {
      verify(specificationService.searchSpecifications('Search String')).called();
      expect(specificationSearchDetailComponent.specifications).toBe(specifications);
    });
  });
});
