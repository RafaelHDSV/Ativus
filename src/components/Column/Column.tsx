import { DotsThree, PencilSimple, Plus, Trash } from '@phosphor-icons/react'
import {
  Button,
  Col,
  Dropdown,
  FormInstance,
  Input,
  MenuProps,
  Row
} from 'antd'
import { Fragment, useState } from 'react'
import { Pressable } from '../Pressable/Pressable'
import styles from './Column.module.scss'
import { IColumn } from './columnInterfaces'

interface IColumnProps {
  column: IColumn
  setColumns: React.Dispatch<React.SetStateAction<IColumn[]>>
  setCreateEditColumnModalVisible: (visible: boolean) => void
  form: FormInstance
  setColumnBeingEdited: (column: IColumn | null) => void
  deleteColumn: (columnId: number) => void
}

export default function Column({
  column,
  setColumns,
  setCreateEditColumnModalVisible,
  setColumnBeingEdited,
  deleteColumn,
  form
}: IColumnProps) {
  const [editingItem, setEditingItem] = useState<{
    columnId: number
    itemIndex: number
  } | null>(null)
  const [editValue, setEditValue] = useState('')

  const handleDragStart = (
    e: React.DragEvent,
    item: string,
    fromColumnId: number
  ) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ item, fromColumnId }))
  }

  const handleDrop = (e: React.DragEvent, toColumnId: number) => {
    e.preventDefault()
    const { item, fromColumnId } = JSON.parse(
      e.dataTransfer.getData('text/plain')
    )

    if (fromColumnId === toColumnId) return

    setColumns((prev) =>
      prev.map((col) => {
        if (col._id === fromColumnId) {
          return { ...col, items: col.items.filter((i) => i !== item) }
        }
        if (col._id === toColumnId) {
          return { ...col, items: [...col.items, item] }
        }
        return col
      })
    )
  }

  const handleAddItem = (columnId: number, newItem: string) => {
    if (!newItem.trim()) return
    setColumns((prev) =>
      prev.map((col) =>
        col._id === columnId ? { ...col, items: [...col.items, newItem] } : col
      )
    )
  }

  const handleEditItem = (
    columnId: number,
    itemIndex: number,
    value: string
  ) => {
    setEditingItem({ columnId, itemIndex })
    setEditValue(value)
  }

  const handleSaveEdit = () => {
    if (!editingItem || !editValue.trim()) return

    setColumns((prev) =>
      prev.map((col) => {
        if (col._id === editingItem.columnId) {
          const updatedItems = [...col.items]
          updatedItems[editingItem.itemIndex] = editValue
          return { ...col, items: updatedItems }
        }
        return col
      })
    )
    setEditingItem(null)
    setEditValue('')
  }

  const handleDeleteItem = (columnId: number, itemIndex: number) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col._id === columnId) {
          return { ...col, items: col.items.filter((_, i) => i !== itemIndex) }
        }
        return col
      })
    )
  }

  const menuItems: MenuProps['items'] = [
    {
      key: 'edit',
      icon: <PencilSimple size={18} />,
      label: 'Editar',
      onClick: () => {
        form.setFieldsValue({
          name: column.title,
          description: column.description
        })
        setColumnBeingEdited(column)
        setCreateEditColumnModalVisible(true)
      }
    },
    {
      key: 'delete',
      icon: <Trash size={18} />,
      label: 'Excluir',
      onClick: () => deleteColumn(column._id)
    }
  ]

  return (
    <div
      className={styles.column}
      onDrop={(e) => handleDrop(e, column._id)}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className={styles.content}>
        <header className={styles.header}>
          <Row className='w-100'>
            <Col>
              <h2>{column.title}</h2>
              <span>({column.items.length})</span>
            </Col>

            <Dropdown menu={{ items: menuItems }} trigger={['click']} arrow>
              <Pressable icon>
                <DotsThree size={24} />
              </Pressable>
            </Dropdown>
          </Row>
          <p>{column.description}</p>
        </header>

        <div className={styles.itemsContainer}>
          {column.items.map((item, index) => (
            <Fragment key={index}>
              {editingItem?.columnId === column._id &&
              editingItem.itemIndex === index ? (
                <div className={styles.itemEdit}>
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <Button onClick={handleSaveEdit}>Salvar</Button>
                  <Button onClick={() => setEditingItem(null)}>Cancelar</Button>
                </div>
              ) : (
                <div
                  className={styles.item}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, column._id)}
                >
                  {item}
                  <div className={styles.buttons}>
                    <Button
                      onClick={() => handleEditItem(column._id, index, item)}
                      icon={<PencilSimple />}
                    />
                    <Button
                      onClick={() => handleDeleteItem(column._id, index)}
                      icon={<Trash />}
                    />
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          const input = e.currentTarget.elements.namedItem(
            'newItem'
          ) as HTMLInputElement
          handleAddItem(column._id, input.value)
          input.value = ''
        }}
      >
        <div className={styles.newItemForm}>
          <Input name='newItem' placeholder='Novo Item' />
          <Button htmlType='submit' icon={<Plus />} />
        </div>
      </form>
    </div>
  )
}
