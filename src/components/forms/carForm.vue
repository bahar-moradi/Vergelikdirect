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
        <input type="text" class="form-control" id="input1" placeholder="Enter license plate...">
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
          <option v-for="option in options" :value="option.value">{{ option.value }}</option>
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

  data(){
    return{
      selected:'7501 t/m 10000 KM', 
      options:[
        {value:'0 t/m 7500 KM'},
        {value:'7501 t/m 10000 KM'},
        {value:'10001 t/m 12000 KM'},
        {value:'12001 t/m 15000 KM'},
        {value:'15000 t/m 20000 KM'},
        {value:'20001 t/m 25000 KM'},
        {value:'25001 t/m 30000 KM'},
        {value:'30001 t/m 90000 KM'},
      ]
      }
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
