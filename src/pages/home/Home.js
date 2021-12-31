import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import { useCollection } from '../../hooks/useCollection.js';
import { useThemeContext } from '../../hooks/useThemeContext.js';
// components
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList.js';
// styles
import styles from './Home.module.css';

export default function Home() {
  const [expense, setExpense] = useState(0);
  const { user } = useAuthContext();
  const { mode } = useThemeContext();
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

      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });
      
      setExpense(formatter.format(total))
    }

  }, [documents]);

  return (
    <div className='wrapper'>
      <section className={styles['home-left']}>
        <h2 className={mode}>Total Expenses: {expense}</h2>
        {error && <p className='error'>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </section>
      <aside className={styles['home-right']}>
        <TransactionForm uid={user.uid}/>
      </aside>
    </div>
  )
}
