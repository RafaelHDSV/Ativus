import dayjs from 'dayjs'
import { useState } from 'react'
import { MOCKED_VALUES } from './columnConstants'
import { IAddNewColumnProps, IColumn } from './columnInterfaces'

export function useColumns() {
  const [columns, setColumns] = useState<IColumn[]>(MOCKED_VALUES)

  function addNewColumn({
    form,
    values,
    setCreateEditColumnModalVisible,
    messageApi
  }: IAddNewColumnProps) {
    try {
      const newColumn: IColumn = {
        _id: Math.floor(Math.random() * 1000),
        title: values.name,
        description: values.description,
        items: [],
        lastUpdated: dayjs().format('DD/MM/YYYY HH:mm')
      }

      setColumns((prevColumns) => [...prevColumns, newColumn])
      messageApi.success({
        content: 'Coluna adicionada com sucesso!',
        duration: 2
      })
    } catch (err) {
      console.error(err)
    } finally {
      form.resetFields()
      setCreateEditColumnModalVisible(false)
    }
  }

  function resetMockedColumns() {
    setColumns(MOCKED_VALUES)
  }

  function cleanColumns() {
    setColumns([])
  }

  return {
    columns,
    setColumns,
    addNewColumn,
    resetMockedColumns,
    cleanColumns
  }
}
