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
      rateFrom: function(){
        return this.allTheRates[this.initialCurrency];
      },
      rateTo: function(){
        return this.allTheRates[this.finalCurrency];
      },
      convertAmount: function(){
        const initialAmount = this.amount / this.rateFrom;
        const finalAmount = initialAmount * this.rateTo;
        return finalAmount.toFixed(2);
      }
    },
    methods: {
      fetchRates: function(){
        const request = fetch("https://api.exchangeratesapi.io/latest")
        .then(response => response.json())
        .then((data) => {
          this.allTheRates = data.rates;
          this.allTheRates["EUR"] = 1;
        })
      }
    }
  })
})
