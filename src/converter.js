import React, { useState, useEffect } from "react";
import "./converter.css";




function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState();
  const [convertedAmount, setConvertedAmount] = useState();




  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "rSBm4jiKPed9rSc1IutPcUEzHnEkJXT6");

    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    };

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to={toCurrency}&from={fromCurrency}&amount={Amount}`, requestOptions)
    .then(response => {
        setExchangeRate(response.data.rates[toCurrency]);
    })

    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  }, [convertedAmount, toCurrency]);



  useEffect(() => {
    // Convert the amount to the desired currency
    if (exchangeRate) {
      setConvertedAmount(amount * exchangeRate);
    }
  }, [amount, exchangeRate]);



  function handleAmountChange(event) {
    setAmount(event.target.value);
  }

  function handleFromCurrencyChange(event) {
    setFromCurrency(event.target.value);
  }

  function handleToCurrencyChange(event) {
    setToCurrency(event.target.value);
  }

  return (
    <div className="container">
      <h1>Currency Converter</h1>

      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>

      <div>
        <label>From Currency:</label>
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          {/* Add more options for other currencies */}
        </select>
      </div>
      
      <div>
        <label>To Currency:</label>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          {/* Add more options for other currencies */}
        </select>
      </div>
      <div>
        <p>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</p>
      </div>
    </div>
  );
}

export default CurrencyConverter;
