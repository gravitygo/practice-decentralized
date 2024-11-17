import { useEffect, useState } from 'react';
import { dbank_backend } from 'declarations/dbank_backend';

function App() {
  const [balance, setBalance] = useState(0);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      setLoad(true)
      const balance = await dbank_backend.checkBalance();
      setBalance(balance);
      setLoad(false)
    }
    fetchBalance();
  }, []);

  async function getBalance() {
    try {
      setLoad(true)
      const accountBalance = await dbank_backend.checkBalance();
      setBalance(accountBalance);
    } catch (error) {
      console.error("failed to get the balance:", error);
    } finally {
      setLoad(false)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (load) return false;
    const topUp = parseFloat(event.target.elements.topUp.value || 0);
    const withdraw = parseFloat(event.target.elements.withdraw.value || 0);

    try {
      setLoad(true)
      await dbank_backend.topUp(topUp);
      await dbank_backend.withdraw(withdraw);
      await getBalance();
    } catch (error) {
      console.error("Failed transaction:", error)
    } finally {
      setLoad(false)
    }

    return false;
  }

  return (
    <main className="p-3 rounded flex flex-col items-center justify-center bg-blue-500">
      <h3 className="text-lg font-medium text-slate-50">${(Math.round(balance * 100) / 100).toFixed(2)}</h3>
      <form className="gap-2 flex flex-col" action="#" onSubmit={handleSubmit}>
        <label htmlFor="topUp" className='font-mono text-slate-300'>Amount to Top Up</label>
        <input id="topUp" alt="top up" type="number" />
        <label htmlFor="withdraw" className='font-mono text-slate-300'>Amount to Withdraw</label>
        <input id="withdraw" alt="withdraw" type="number" />
        <button type="submit" disabled={load} className='rounded text-white px-4 py-2 disabled:bg-gray-600 disabled:hover:bg-gray-600 bg-slate-500 hover:bg-slate-600'>Click Me!{load}</button>
      </form>
    </main>
  );
}

export default App;
