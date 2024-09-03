import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OracleDatabaseComponent } from './oracle-database.component';

describe('OracleDatabaseComponent', () => {
  let component: OracleDatabaseComponent;
  let fixture: ComponentFixture<OracleDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OracleDatabaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OracleDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
