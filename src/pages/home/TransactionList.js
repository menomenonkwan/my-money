import { useFirestore } from '../../hooks/useFirestore';
// styles
import styles from './Home.module.css';
import deleteIcon from '../../assets/delete.svg';

export default function TransactionList({ transactions }) {
  const { deleteDocument } = useFirestore('transactions');

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return (
    <ul className={styles.transactions}>
      {transactions.map(transaction => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>{formatter.format(transaction.amount)}</p>
          <div>
            <button onClick={() => deleteDocument(transaction.id)}>
              <img src={deleteIcon} alt="delete" />
            </button>
            <p className={styles.date}>{transaction.date}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
