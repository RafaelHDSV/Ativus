import { Button, Form, Input, message, Modal } from 'antd'
import { useState } from 'react'
import Column from '../../components/Column/Column'
import { useColumns } from '../../components/Column/columnFunctions'
import { IColumn } from '../../components/Column/columnInterfaces'
import styles from './Main.module.scss'

export default function Main() {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [createEditColumnModalVisible, setCreateEditColumnModalVisible] =
    useState(false)
  const [columnBeingEdited, setColumnBeingEdited] = useState<IColumn | null>(
    null
  )

  const createEditColumnModalVisibleTitle = columnBeingEdited
    ? 'Editar Coluna'
    : 'Adicionar Coluna'
  const createEditColumnModalVisibleOkText = columnBeingEdited
    ? 'Salvar'
    : 'Adicionar'

  const {
    columns,
    setColumns,
    addNewColumn,
    resetMockedColumns,
    cleanColumns
  } = useColumns()

  const deleteColumn = (columnId: number) => {
    Modal.confirm({
      title: 'Tem certeza que deseja excluir esta coluna?',
      content: 'Essa ação não pode ser desfeita.',
      okText: 'Sim, excluir',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: () => {
        setColumns((prev) => prev.filter((col) => col._id !== columnId))
        messageApi.success('Coluna deletada com sucesso!')
      }
    })
  }

  return (
    <>
      {contextHolder}
      <Modal
        className={styles.createColumnModal}
        open={createEditColumnModalVisible}
        title={createEditColumnModalVisibleTitle}
        okText={createEditColumnModalVisibleOkText}
        onOk={() => form.submit()}
        onCancel={() => {
          form.resetFields()
          setColumnBeingEdited(null)
          setCreateEditColumnModalVisible(false)
        }}
        closable={false}
        width={400}
        centered
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={(values) => {
            if (columnBeingEdited) {
              const updatedColumns = columns.map((col) =>
                col._id === columnBeingEdited._id
                  ? {
                      ...col,
                      title: values.name,
                      description: values.description
                    }
                  : col
              )
              setColumns(updatedColumns)
              setColumnBeingEdited(null)
              setCreateEditColumnModalVisible(false)
              form.resetFields()
              messageApi.success('Coluna atualizada com sucesso!')
            } else {
              addNewColumn({
                form,
                values,
                setCreateEditColumnModalVisible,
                messageApi
              })
            }
          }}
          className={styles.createColumnForm}
        >
          <Form.Item
            name='name'
            label='Nome da Coluna'
            rules={[{ required: true, message: 'Insira o nome da coluna' }]}
          >
            <Input autoComplete='off' />
          </Form.Item>

          <Form.Item name='description' label='Descrição da Coluna'>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <main className={styles.main}>
        <nav className={styles.navbar}>
          <div onClick={resetMockedColumns} className={styles.imageLogo} />

          <div className={styles.buttons}>
            <Button
              type='primary'
              className='button'
              onClick={() => setCreateEditColumnModalVisible(true)}
            >
              Adicionar coluna
            </Button>

            <Button type='default' className='button' onClick={cleanColumns}>
              Limpar colunas
            </Button>
          </div>
        </nav>

        <div className={styles.columnsContainer}>
          {columns?.map((column) => (
            <Column
              key={column._id}
              column={column}
              setColumns={setColumns}
              setCreateEditColumnModalVisible={setCreateEditColumnModalVisible}
              setColumnBeingEdited={setColumnBeingEdited}
              deleteColumn={deleteColumn}
              form={form}
            />
          ))}
        </div>
      </main>
    </>
  )
}
