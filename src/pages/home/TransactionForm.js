import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionForm({ uid }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const { addDocument, response } = useFirestore('transactions');

  const handleSubmit = (e) => {
    e.preventDefault();
    const money = Math.round((Number(amount) + Number.EPSILON) * 100) / 100;

    addDocument({ name: name.trim(), amount: money, date, uid });
  }

  useEffect(() => {
    if (response.success) {
      setName('');
      setAmount('');
      setDate('');
    }
  }, [response.success])

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add A Transaction</h3>
      <label>
        <span>Name:</span>
        <input 
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </label>

      <label>
        <span>Date:</span>
        <input 
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          required
        />
      </label>

      <label>
        <span>Amount:</span>
        <input 
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          required
        />
      </label>
      
      <button type="submit" className="btn">Add</button>
    </form>
  )
}
