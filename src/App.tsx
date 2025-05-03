import { useState } from 'react'
import Column from './components/Column/Column'
import styles from './App.module.scss'
import { MOCKED_VALUES } from './components/Column/columnConstants'
import { IColumn } from './components/Column/columnInterfaces'

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

  function resetMockedColumns() {
    setColumns(MOCKED_VALUES)
  }

  return (
    <main className={styles.app}>
      <nav className={styles.navbar}>
        <div onClick={resetMockedColumns} className={styles.imageLogo}></div>
        <button className='primaryButton' onClick={handleClick}>
          Adicionar coluna
        </button>
        <button className='secondaryButton' onClick={() => setColumns([])}>
          Limpar colunas
        </button>
      </nav>

      <div className={styles.columnsContainer}>
        {columns?.map(column => (
          <Column key={column._id} column={column} setColumns={setColumns} />
        ))}
      </div>
    </main>
  )
}
