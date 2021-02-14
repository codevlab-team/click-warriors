import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServersListPage } from './servers-list.page';

describe('ServersListPage', () => {
  let component: ServersListPage;
  let fixture: ComponentFixture<ServersListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServersListPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServersListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
