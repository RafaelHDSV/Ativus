import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.body}>
      <div className={styles.column}>
        <h2>Backlog</h2>
        {new Array(15).fill('').map((_, index) => (
          <p key={index}>Item</p>
        ))}
      </div>
      <div className={styles.column}>
        <h2>Em andamento</h2>
        {new Array(15).fill('').map((_, index) => (
          <p key={index}>Item</p>
        ))}
      </div>
      <div className={styles.column}>
        <h2>PR</h2>
        {new Array(15).fill('').map((_, index) => (
          <p key={index}>Item</p>
        ))}
      </div>
      <div className={styles.column}>
        <h2>Teste</h2>
        {new Array(15).fill('').map((_, index) => (
          <p key={index}>Item</p>
        ))}
      </div>
      <div className={styles.column}>
        <h2>Em produção</h2>
        {new Array(15).fill('').map((_, index) => (
          <p key={index}>Item</p>
        ))}
      </div>
    </div>
  )
}

export default App
