import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import { useCollection } from '../../hooks/useCollection.js';
// components
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList.js';
// styles
import styles from './Home.module.css';

export default function Home() {
  const [expense, setExpense] = useState(0);
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    'transactions',
    ["uid", "==", user.uid],
    ["date", "asc"]
  );

  useEffect(() => {
    if (documents) {
      let total = 0;
      documents.forEach(document => {
        total = total + document.amount;
      })
      setExpense(Number(total.toFixed(2)))
    }

  }, [documents]);


  return (
    <div className='container'>
      <div className='wrapper'>
        <section className={styles['home-left']}>
          <h2>Total Expenses: ${expense}</h2>
          {error && <p className='error'>{error}</p>}
          {documents && <TransactionList transactions={documents} />}
        </section>
        <aside className={styles['home-right']}>
          <TransactionForm uid={user.uid}/>
        </aside>
      </div>
    </div>
  )
}
