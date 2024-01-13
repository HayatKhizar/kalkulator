import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryModalPage } from './history-modal.page';

describe('HistoryModalPage', () => {
  let component: HistoryModalPage;
  let fixture: ComponentFixture<HistoryModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HistoryModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
