import { Options, Vue } from 'vue-class-component';
import SimpleCard from './simpleCard.vue';
import moment from 'moment';

@Options({
  components: {
    SimpleCard,
  },
})
export default class CarForm extends Vue {
  licensePlate: string = "";
  zipCode: string = "";
  houseNumber!: number;
  additionDetail: string = "";
  birthDate: string = "";
  invalideClass: string = "is-invalid";
  claimFreeMax: number = 0;
  claimFreeYears: number = 0;

  defaultBirthDateException = "Please provide a valide date in DD-MM-YYYY format.";

  selectedKilometerRange: any = 2;
  kilometerRanges: any = [
    { text: '0 t/m 7500 KM', value: '1' },
    { text: '7501 t/m 10000 KM', value: '2' },
    { text: '10001 t/m 12000 KM', value: '3' },
    { text: '12001 t/m 15000 KM', value: '4' },
    { text: '15000 t/m 20000 KM', value: '5' },
    { text: '20001 t/m 25000 KM', value: '6' },
    { text: '25001 t/m 30000 KM', value: '7' },
    { text: '30001 t/m 90000 KM', value: '8' },
  ]

  onSubmit(e: any): void {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.add('was-validated');

    if (e.target.checkValidity() === true) {
      var url = new URL(window.location.href);
      url.searchParams.append('licensePlate', this.licensePlate);
      url.searchParams.append('zipCode', this.zipCode);
      url.searchParams.append('houseNumber', this.houseNumber.toString());
      url.searchParams.append('additionDetail', this.additionDetail);
      url.searchParams.append('birthDate', this.birthDate);
      url.searchParams.append('selectedKilometerRange', this.selectedKilometerRange);
      window.location.assign(url.href);
      console.log(url);
    }
  }

  rdwURL: string = 'https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=';
  carData: any[] = [{ merk: "", datum_eerste_toelating: "" }];

  async getCartData(e: any): Promise<void> {
    console.log(`Getting data for ${e.target.value}`)

    const url = `${this.rdwURL}${e.target.value}`;
    var data = await (await fetch(url)).json();

    if (data.length > 0) {
      this.carData = data;
    }
    else {
      this.setInValid(e.target);
      this.carData = [{ merk: "", datum_eerste_toelating: "" }];
    }

    console.log(this.carData);
  }

  txtLicensePlate_onKeyup(e: any): void {
    e.target.value = e.target.value.replace(' ', '').replace('-', '').toUpperCase();

    if (e.target.validity.valid) {
      this.setValid(e.target);
      this.getCartData(e);
    }
  }

  txtLicensePlate_onKeydown(e: any): void {
    this.setValid(e.target);
  }

  fixZipCodeFormat(e: any): void {
    e.target.value = e.target.value.replace(' ', '').replace('-', '').toUpperCase();
  }

  txtBirthDate_onKeyup(e: any): void {
    if (e.target.validity.valueMissing) {
      this.defaultBirthDateException = "Birth date is required!"
      this.setInValid(e.target);
      return;
    }

    if (e.target.validity.valid) {
      this.setValid(e.target);

      var date = moment(e.target.value, "DD-MM-YYYY", true);
      var currentDate = moment();
      if (date.isValid()) {
        var age = currentDate.diff(date, 'years');
        if (age < 100) {
          this.setClaimFreeMax(age);
        }
        else {
          this.defaultBirthDateException = "You seem a bit old for this :)";
          this.setInValid(e.target);
        }
      }
      else {
        this.defaultBirthDateException = "Please provide a valide date in DD-MM-YYYY format."
        this.setInValid(e.target);
      }
    }
  }

  txtBirthDate_onKeydown(e: any): void {
    this.setValid(e.target);
  }

  setValid(element: any): void {
    if (element.classList.contains(this.invalideClass) === true) {
      element.classList.remove(this.invalideClass);
    }
    element.setCustomValidity("");
  }

  setInValid(element: any): void {
    if (element.classList.contains(this.invalideClass) === false) {
      element.classList.add(this.invalideClass);
    }
    element.setCustomValidity("Invalid field.");
  }

  setClaimFreeMax(age: number) {
    this.claimFreeMax = age - 18;
  }
}
