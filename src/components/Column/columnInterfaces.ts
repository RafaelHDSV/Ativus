export interface IColumn {
  _id: number
  title: string
  description?: string
  items: string[]
  lastUpdated: string
}

export interface IColumnFormValues {
  name: string
  description?: string
}

export interface IAddNewColumnProps {
  values: IColumnFormValues
  setCreateColumnModalVisible: (visible: boolean) => void
}
