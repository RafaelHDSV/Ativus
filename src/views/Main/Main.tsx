import { Button, Form, Input, message, Modal } from 'antd'
import { useState } from 'react'
import Column from '../../components/Column/Column'
import { useColumns } from '../../components/Column/columnFunctions'
import styles from './Main.module.scss'

export default function Main() {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [createColumnModalVisible, setCreateColumnModalVisible] =
    useState(false)

  const {
    columns,
    setColumns,
    addNewColumn,
    resetMockedColumns,
    cleanColumns
  } = useColumns()

  return (
    <>
      {contextHolder}
      <Modal
        className={styles.createColumnModal}
        open={createColumnModalVisible}
        title='Adicionar Coluna'
        okText='Adicionar'
        onOk={() => form.submit()}
        onCancel={() => {
          form.resetFields()
          setCreateColumnModalVisible(false)
        }}
        closable={false}
        width={400}
        centered
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={(values) => {
            addNewColumn({
              form,
              values,
              setCreateColumnModalVisible,
              messageApi
            })
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
              onClick={() => setCreateColumnModalVisible(true)}
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
            <Column key={column._id} column={column} setColumns={setColumns} />
          ))}
        </div>
      </main>
    </>
  )
}
