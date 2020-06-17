import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: "#app",
    data: {
      allTheRates: {},
      initialCurrency: "GBP",
      finalCurrency: "EUR",
      amount: null
    },
    mounted(){
      this.fetchRates();
    },
    computed: {
      rateFrom(){
        return this.allTheRates[this.initialCurrency];
      },
      rateTo(){
        return this.allTheRates[this.finalCurrency];
      },
      convertAmount(){
        const initialAmount = this.amount / this.rateFrom;
        const finalAmount = initialAmount * this.rateTo;
        return finalAmount.toFixed(2);
      }
    },
    methods: {
      fetchRates: function(){
        const request = fetch("https://api.exchangeratesapi.io/latest")
        .then(response => response.json())
        .then((response) => {
          this.allTheRates = response.rates;
          this.allTheRates["EUR"] = 1;
        })
      }
    }
  })
})
