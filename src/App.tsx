import { useState } from 'react'
import { MOCKED_VALUES } from './constants'
import { IColumn } from './interfaces'
import Column from './components/Column/Column'
import styles from './App.module.scss'

export default function App() {
  const [columns, setColumns] = useState<IColumn[] | []>(MOCKED_VALUES)

  function handleClick() {
    const newColumn = {
      _id: Date.now(),
      title: `Coluna ${columns.length + 1}`,
      items: ['Novo item 1', 'Novo item 2']
    }

    setColumns(prevColumns => [...prevColumns, newColumn])
  }

  return (
    <main className={styles.app}>
      <nav>
        <img style={{ width: '100px' }} src='./logo.png' alt='logo.png' />
        <button onClick={handleClick}>Adicionar coluna</button>
        <button onClick={() => setColumns([])}>Limpar colunas</button>
      </nav>

      <div className={styles.columnsContainer}>
        {columns?.map(column => (
          <Column key={column._id} column={column} setColumns={setColumns} />
        ))}
      </div>
    </main>
  )
}
