import dayjs from 'dayjs'
import { IColumn } from './columnInterfaces'

/**
 * MOCKED_VALUES is a mock dataset representing columns for a kanban-style board.
 * Each column contains an identifier, a title, the last updated date (formatted as 'DD/MM/YYYY HH:mm'),
 * and a list of items (tasks) associated with that column.
 *
 * @description
 * This constant is useful for development and testing purposes, providing sample data for UI components
 * that display columns and their respective tasks.
 *
 * @type {IColumn[]}
 */
export const MOCKED_VALUES: IColumn[] = [
  {
    _id: 1,
    title: 'Tarefas Pendentes',
    description: 'Tarefas que ainda não foram iniciadas.',
    lastUpdated: dayjs('2025-03-01 10:30').format('DD/MM/YYYY HH:mm'),
    items: ['Escrever documentação', 'Revisar código', 'Planejar sprint']
  },
  {
    _id: 2,
    title: 'Em andamento',
    description: 'Tarefas atualmente em desenvolvimento.',
    lastUpdated: dayjs('2025-04-28 14:45').format('DD/MM/YYYY HH:mm'),
    items: ['Implementar autenticação', 'Criar testes unitários']
  },
  {
    _id: 3,
    title: 'Em testes',
    description: 'Tarefas que estão sendo testadas.',
    lastUpdated: dayjs('2025-04-25 09:15').format('DD/MM/YYYY HH:mm'),
    items: ['Testar integração com API', 'Validar fluxo de pagamento']
  },
  {
    _id: 4,
    title: 'Reprovado em testes',
    description: 'Tarefas que falharam nos testes.',
    lastUpdated: dayjs('2025-04-20 16:00').format('DD/MM/YYYY HH:mm'),
    items: ['Corrigir bug no login', 'Ajustar layout no mobile']
  },
  {
    _id: 5,
    title: 'Em Produção',
    description: 'Tarefas já entregues e em produção.',
    lastUpdated: dayjs('2025-04-15 11:20').format('DD/MM/YYYY HH:mm'),
    items: ['Monitorar logs', 'Realizar deploy']
  }
]
