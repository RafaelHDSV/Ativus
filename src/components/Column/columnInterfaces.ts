import { FormInstance } from 'antd'
import { MessageInstance } from 'antd/es/message/interface'

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
  form: FormInstance
  values: IColumnFormValues
  setCreateEditColumnModalVisible: (visible: boolean) => void
  messageApi: MessageInstance
}
