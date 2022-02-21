import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    NaamBezoekers: new FormControl('', Validators.required),
    LogoThuisploeg: new FormControl('', Validators.email),
    NaamThuisploeg: new FormControl('', [Validators.required, Validators.minLength(8)]),
    NavoegselBezoekers: new FormControl(''),
    NavoegselThuisploeg: new FormControl('1'),
    RoepNaamSpeler: new FormControl(0),
    Rugnummer: new FormControl(''),
    RugnummerNaam: new FormControl(false),
    RugnummerNaamVoornaam: new FormControl(false),
    Score: new FormControl(false),
    Speeldag: new FormControl(false),
    SpelerEnoFVrijeTekst: new FormControl(false),
    SponsorLogo: new FormControl(false),
    SponsorNaam: new FormControl(false),
    Stadion: new FormControl(false),
    SubTemplate: new FormControl(false),
    Tekst: new FormControl(false),
    VasteAfbeelding: new FormControl(false),
    Video: new FormControl(false),
    Voornaam: new FormControl(false),
    VoorNaamEnFamilienaam: new FormControl(false),
    VoorVoegselBezoekers: new FormControl(false),
    VoorVoegselThuisploeg: new FormControl(false),
    WedstrijdTypeLogo: new FormControl(false),
    WedstrijdTypeNaam: new FormControl(false),
  })

  intializeFormGorup() {
    this.form.setValue({
      $key: null,
      NaamBezoekers: '',
      LogoThuisploeg: '',
      NaamThuisploeg:'',
      NavoegselBezoekers: '',
      NavoegselThuisploeg:'',
      RoepNaamSpeler: '',
      Rugnummer: '',
      RugnummerNaam: '',
      RugnummerNaamVoornaam: '',
      Score: '',
      Speeldag: '',
      SpelerEnoFVrijeTekst:'',
      SponsorLogo: '',
      SponsorNaam: '',
      Stadion: '',
      SubTemplate: '',
      Tekst: '',
      VasteAfbeelding: '',
      Video: '',
      Voornaam: '',
      VoorNaamEnFamilienaam: '',
      VoorVoegselBezoekers: '',
      VoorVoegselThuisploeg: '',
      WedstrijdTypeLogo: '',
      WedstrijdTypeNaam: '',

    })
  }

  constructor() { }
}
