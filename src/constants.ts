import dayjs from 'dayjs'
import { IColumn } from './interfaces'

export const MOCKED_VALUES: IColumn[] = [
  {
    _id: 1,
    title: 'Tarefas Pendentes',
    lastUpdated: dayjs('2025-03-01 10:30').format('DD/MM/YYYY HH:mm'),
    items: ['Escrever documentação', 'Revisar código', 'Planejar sprint']
  },
  {
    _id: 2,
    title: 'Em andamento',
    lastUpdated: dayjs('2025-04-28 14:45').format('DD/MM/YYYY HH:mm'),
    items: ['Implementar autenticação', 'Criar testes unitários']
  },
  {
    _id: 3,
    title: 'Em testes',
    lastUpdated: dayjs('2025-04-25 09:15').format('DD/MM/YYYY HH:mm'),
    items: ['Testar integração com API', 'Validar fluxo de pagamento']
  },
  {
    _id: 4,
    title: 'Reprovado em testes',
    lastUpdated: dayjs('2025-04-20 16:00').format('DD/MM/YYYY HH:mm'),
    items: ['Corrigir bug no login', 'Ajustar layout no mobile']
  },
  {
    _id: 5,
    title: 'Em Produção',
    lastUpdated: dayjs('2025-04-15 11:20').format('DD/MM/YYYY HH:mm'),
    items: ['Monitorar logs', 'Realizar deploy']
  }
]
