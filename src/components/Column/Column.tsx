import { Clock, PencilSimple, Plus, Trash } from '@phosphor-icons/react'
import { Button, Input, Modal } from 'antd'
import { useState } from 'react'
import styles from './Column.module.scss'
import { IColumn } from './columnInterfaces'

interface IColumnProps {
  column: IColumn
  setColumns: React.Dispatch<React.SetStateAction<IColumn[]>>
}
export default function Column({ column, setColumns }: IColumnProps) {
  const [modalVisible, setModalVisible] = useState(false)
  const [editingItem, setEditingItem] = useState<{
    columnId: number
    itemIndex: number
  } | null>(null)
  const [editValue, setEditValue] = useState('')

  const handleDragStart = (
    event: React.DragEvent<HTMLParagraphElement>,
    item: string,
    fromColumnId: number
  ) => {
    event.dataTransfer.setData(
      'text/plain',
      JSON.stringify({ item, fromColumnId })
    )
  }

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    toColumnId: number
  ) => {
    event.preventDefault()
    const data = JSON.parse(event.dataTransfer.getData('text/plain'))
    const { item, fromColumnId } = data

    if (fromColumnId === toColumnId) return

    setColumns((prevColumns) => {
      const updatedColumns = prevColumns.map((column) => {
        if (column._id === fromColumnId) {
          return { ...column, items: column.items.filter((i) => i !== item) }
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

    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column._id === columnId
          ? { ...column, items: [...column.items, newItem] }
          : column
      )
    )
  }

  const handleEditItem = (
    columnId: number,
    itemIndex: number,
    currentValue: string
  ) => {
    setEditingItem({ columnId, itemIndex })
    setEditValue(currentValue)
  }

  const handleSaveEdit = () => {
    if (!editingItem || !editValue.trim()) return

    setColumns((prevColumns) =>
      prevColumns.map((column) => {
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
    setColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column._id === columnId) {
          const updatedItems = column.items.filter(
            (_, index) => index !== itemIndex
          )
          return { ...column, items: updatedItems }
        }
        return column
      })
    )
  }

  function handleClickItem() {
    setModalVisible(true)
  }

  return (
    <div
      className={styles.column}
      key={column._id}
      onDrop={(event) => handleDrop(event, column._id)}
      onDragOver={handleDragOver}
    >
      <div className={styles.content}>
        <header className={styles.header}>
          <div>
            <h2>{column.title}</h2>
            <span>({column.items.length})</span>
          </div>

          <p>{column.description}</p>
        </header>

        <div className={styles.itemsContainer}>
          {column.items.map((item, index) => (
            <>
              <Modal
                open={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
                title='Detalhes do Item'
                closable
                footer={null}
                centered
              >
                <div className={styles.itemModal}>
                  <h3>{item}</h3>
                  <p>Detalhes do item...</p>
                  <Button
                    onClick={() => handleEditItem(column._id, index, item)}
                  >
                    <PencilSimple />
                  </Button>
                  <Button onClick={() => handleDeleteItem(column._id, index)}>
                    <Trash />
                  </Button>
                </div>
              </Modal>

              <div key={index}>
                {editingItem?.columnId === column._id &&
                editingItem.itemIndex === index ? (
                  <div>
                    <Input
                      type='text'
                      value={editValue}
                      onChange={(event) => setEditValue(event.target.value)}
                    />
                    <Button onClick={handleSaveEdit}>Salvar</Button>
                    <Button onClick={() => setEditingItem(null)}>
                      Cancelar
                    </Button>
                  </div>
                ) : (
                  <div
                    className={styles.item}
                    draggable
                    onDragStart={(event) =>
                      handleDragStart(event, item, column._id)
                    }
                    onClick={() => handleClickItem()}
                  >
                    {item}

                    <div className={styles.buttons}>
                      <Button
                        onClick={() => handleEditItem(column._id, index, item)}
                      >
                        <PencilSimple />
                      </Button>
                      <Button
                        onClick={() => handleDeleteItem(column._id, index)}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ))}
        </div>
      </div>

      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            const input = event.currentTarget.elements.namedItem(
              'newItem'
            ) as HTMLInputElement
            handleAddItem(column._id, input.value)
            input.value = ''
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input name='newItem' placeholder='Novo Item' />
            <Button htmlType='submit'>
              <Plus />
            </Button>
          </div>
        </form>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '0.5rem',
            gap: '0.5rem'
          }}
        >
          <Clock />
          <p style={{ fontSize: '0.75rem', color: '#777' }}>
            {column.lastUpdated}
          </p>
        </div>
      </div>
    </div>
  )
}
