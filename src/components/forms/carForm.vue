<template>
  <div class="d-flex align-items-center " style="height: 100vh;">
    <div class="container bg-light py-4 px-4 rounded">
      <h1>Compare Car Insurance</h1>
      <p class="lead">
        Please complete the form below to start the process.
      </p>
      <form class="form">
        <div class="form-group">
          <label for="input1">LicensePlate</label>
          <input type="text" class="form-control" id="input1" placeholder="Enter license plate..." v-on:keyup="fixLisencePlateForm($event)"  @change="getCartData($event)"  pattern="[A-Z0-9]{6}" required>
          <div class="invalid-feedback">
            Please provide a valide lisence plate.
          </div>
        </div>
        <div>
          {{ carData[0].merk }}
          {{ carData[0].datum_eerste_toelating }}
         </div>
        <div class="form-group">
          <label for="input2">Zipcode</label>
          <input type="text" class="form-control" id="input2" placeholder="0000XX">
        </div>
        <div class="form-row">
          <div class="form-group col-8">
            <label for="input3">House number</label>
            <input type="nember" class="form-control" id="input3">
          </div>
          <div class="form-group col-4">
            <label for="input4">Addition</label>
            <input type="text" class="form-control" id="input4">
          </div>
        </div>
        <div class="form-group">
          <label for="input5">Birth Date</label>
          <input type="text" class="form-control" id="input5" placeholder="DD-MM-YYYY">
        </div>
        <div class="form-group">
          <label for="input6">ClaimFree years</label>
          <input type="range" id="input6" class="form-control-range">
        </div>
        <div class="form-group">
          <label for="input7">Kilometer Range</label>
          <select class="form-control" id="input7" v-model="selected">
            <option v-for="option in kilometerRange" :value="option.value">{{ option.text }}</option>
          </select>
        </div>
        <button class="btn btn-primary" type="submit">Compare now</button>

      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SimpleCard from './simpleCard.vue';



@Options({
  components: {
    SimpleCard,
  },
})
export default class CarForm extends Vue {
  onSubmit(): void {
    console.log('Button is clicked');
  }

  rdwURL: string = 'https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=';
  carData: any[] = [{merk:"", datum_eerste_toelating: "" }];

  data() {
    return {


      selected: '2',
      kilometerRange: [
        { text: '0 t/m 7500 KM', value:'1'},
        { text: '7501 t/m 10000 KM', value:'2'},
        { text: '10001 t/m 12000 KM', value:'3'},
        { text: '12001 t/m 15000 KM', value:'4'},
        { text: '15000 t/m 20000 KM', value:'5'},
        { text: '20001 t/m 25000 KM', value:'6'},
        { text: '25001 t/m 30000 KM', value:'7'},
        { text: '30001 t/m 90000 KM', value:'8'},
      ]
    }
  }

  async getCartData(e: any): Promise<void> {
    
      console.log(`Getting data for ${e.target.value}`)
    

      const url = `${this.rdwURL}${e.target.value}`;
      this.carData = await (await fetch(url)).json();
      console.log(this.carData);
  }


  fixLisencePlateForm(e:any):void{
    e.target.value=e.target.value.replace(' ','').replace('-','').toUpperCase();
  }
}




</script>

<style scoped>
.vd-form {
  width: 330px;
}

@media only screen and (max-width: 768px) {
  .vd-form {
    width: 100%;
  }
}
</style>
