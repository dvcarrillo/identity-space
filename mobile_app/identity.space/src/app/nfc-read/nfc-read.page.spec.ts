import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NfcReadPage } from './nfc-read.page';

describe('NfcReadPage', () => {
  let component: NfcReadPage;
  let fixture: ComponentFixture<NfcReadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NfcReadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NfcReadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
