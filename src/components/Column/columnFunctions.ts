import { useState } from 'react'
import { MOCKED_VALUES } from './columnConstants'
import { IAddNewColumnProps, IColumn } from './columnInterfaces'

export function useColumns() {
  const [columns, setColumns] = useState<IColumn[]>(MOCKED_VALUES)

  function addNewColumn({
    values,
    setCreateColumnModalVisible
  }: IAddNewColumnProps) {
    setCreateColumnModalVisible(false)

    const newColumn: IColumn = {
      _id: Math.floor(Math.random() * 1000),
      title: values.name,
      description: values.description,
      items: [],
      lastUpdated: new Date().toLocaleString()
    }

    setColumns((prevColumns) => [...prevColumns, newColumn])
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
