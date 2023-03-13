import { Options, Vue } from 'vue-class-component';
import SimpleCard from './simpleCard.vue';
import moment from 'moment';

@Options({
  components: {
    SimpleCard
  },
})
export default class CarForm extends Vue {
  invalideClass: string = "is-invalid";
  claimFreeMax: any = '';

  onSubmit(e: any): void {
    console.log('Button is clicked');
    if (e.target.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.target.classList.add('was-validated');
  }
  selected: string = '2';
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

  rdwURL: string = 'https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=';
  carData: any[] = [{ merk: "", datum_eerste_toelating: "" }];

  async getCartData(e: any): Promise<void> {
    console.log(`Getting data for ${e.target.value}`)

    const url = `${this.rdwURL}${e.target.value}`;
    this.carData = await (await fetch(url)).json();
    
    console.log(this.carData);
  }

  fixLisencePlateForm(e: any): void {
    e.target.value = e.target.value.replace(' ', '').replace('-', '').toUpperCase();
  }

  fixZipCodeFormat(e: any): void {
    e.target.value = e.target.value.replace(' ', '').replace('-', '').toUpperCase();
  }

  calculateAge(e: any) {
    var date = moment(e.target.value, "DD-MM-YYYY");
    var currentDate = moment();
    if (date.isValid()) {
      var age = currentDate.diff(date, 'years');
      if (age < 100) {
        this.setClaimFreeMax(age);
      }
      if (age > 100) {
        e.target.classList.add(this.invalideClass)
        alert('you are too old for this')
      }
    }
    else {
      e.target.classList.add(this.invalideClass);
    }
  }

  setClaimFreeMax(age: number) {
    this.claimFreeMax = age - 18;
  }
}
