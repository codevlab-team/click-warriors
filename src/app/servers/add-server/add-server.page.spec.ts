import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServerPage } from './add-server.page';

describe('AddServerPage', () => {
  let component: AddServerPage;
  let fixture: ComponentFixture<AddServerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddServerPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
