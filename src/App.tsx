import React, { useState } from 'react'
import styles from './App.module.scss'
import { MOCKED_VALUES } from './constants'

export default function App() {
  const [columns, setColumns] = useState(MOCKED_VALUES)
  const [editingItem, setEditingItem] = useState<{ columnId: number; itemIndex: number } | null>(null)
  const [editValue, setEditValue] = useState('')

  const handleDragStart = (event: React.DragEvent<HTMLParagraphElement>, item: string, fromColumnId: number) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ item, fromColumnId }))
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, toColumnId: number) => {
    event.preventDefault()
    const data = JSON.parse(event.dataTransfer.getData('text/plain'))
    const { item, fromColumnId } = data

    if (fromColumnId === toColumnId) return

    setColumns(prevColumns => {
      const updatedColumns = prevColumns.map(column => {
        if (column._id === fromColumnId) {
          return { ...column, items: column.items.filter(i => i !== item) }
        }
        if (column._id === toColumnId) {
          return { ...column, items: [...column.items, item] }
        }
        return column
      })
      return updatedColumns
    })
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleAddItem = (columnId: number, newItem: string) => {
    if (!newItem.trim()) return

    setColumns(prevColumns => prevColumns.map(column => (column._id === columnId ? { ...column, items: [...column.items, newItem] } : column)))
  }

  const handleEditItem = (columnId: number, itemIndex: number, currentValue: string) => {
    setEditingItem({ columnId, itemIndex })
    setEditValue(currentValue)
  }

  const handleSaveEdit = () => {
    if (!editingItem || !editValue.trim()) return

    setColumns(prevColumns =>
      prevColumns.map(column => {
        if (column._id === editingItem.columnId) {
          const updatedItems = [...column.items]
          updatedItems[editingItem.itemIndex] = editValue
          return { ...column, items: updatedItems }
        }
        return column
      })
    )
    setEditingItem(null)
    setEditValue('')
  }

  const handleDeleteItem = (columnId: number, itemIndex: number) => {
    setColumns(prevColumns =>
      prevColumns.map(column => {
        if (column._id === columnId) {
          const updatedItems = column.items.filter((_, index) => index !== itemIndex)
          return { ...column, items: updatedItems }
        }
        return column
      })
    )
  }

  return (
    <div className={styles.body}>
      {columns.map(column => (
        <div className={styles.column} key={column._id} onDrop={event => handleDrop(event, column._id)} onDragOver={handleDragOver}>
          <h2>{column.title}</h2>
          {column.items.map((item, index) => (
            <div key={index} className={styles.item}>
              {editingItem?.columnId === column._id && editingItem.itemIndex === index ? (
                <div>
                  <input type='text' value={editValue} onChange={event => setEditValue(event.target.value)} />
                  <button onClick={handleSaveEdit}>Salvar</button>
                  <button onClick={() => setEditingItem(null)}>Cancelar</button>
                </div>
              ) : (
                <p draggable onDragStart={event => handleDragStart(event, item, column._id)}>
                  {item}
                  <button onClick={() => handleEditItem(column._id, index, item)}>Editar</button>
                  <button onClick={() => handleDeleteItem(column._id, index)}>Deletar</button>
                </p>
              )}
            </div>
          ))}
          <form
            onSubmit={event => {
              event.preventDefault()
              const input = event.currentTarget.elements.namedItem('newItem') as HTMLInputElement
              handleAddItem(column._id, input.value)
              input.value = ''
            }}
          >
            <input type='text' name='newItem' placeholder='Novo item' />
            <button type='submit'>Adicionar</button>
          </form>
        </div>
      ))}
    </div>
  )
}
