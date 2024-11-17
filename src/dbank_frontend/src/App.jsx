import { useEffect, useState } from 'react';
import { dbank_backend } from 'declarations/dbank_backend';

function App() {
  const [balance, setBalance] = useState(0);

  useEffect(() => getBalance(), []);

  function getBalance() {
    dbank_backend.checkBalance().then((accountBalance) => {
      setBalance(accountBalance)
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    const topUp = event.target.elements.topUp.value;
    const withdraw = event.target.elements.withdraw.value;


    dbank_backend.topUp(parseFloat(topUp) || 0);
    dbank_backend.withdraw(parseFloat(withdraw) || 0);

    getBalance();
    return false;
  }

  return (
    <main className="p-3 rounded flex flex-col items-center justify-center bg-blue-500">
      <p>{(Math.round(balance * 100) / 100).toFixed(2)}</p>
      <form className="flex flex-col" action="#" onSubmit={handleSubmit}>
        <label htmlFor="topUp">Amount to Top Up</label>
        <input id="topUp" alt="top up" type="number" />
        <br />
        <label htmlFor="withdraw">Amount to Withdraw</label>
        <input id="withdraw" alt="withdraw" type="number" />
        <button type="submit">Click Me!</button>
      </form>
    </main>
  );
}

export default App;
