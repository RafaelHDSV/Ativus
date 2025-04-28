import { Column } from './interfaces'

export const MOCKED_VALUES: Column[] = [
  { _id: 1, title: 'Tarefas Pendentes', items: ['Escrever documentação', 'Revisar código', 'Planejar sprint'] },
  { _id: 2, title: 'Em andamento', items: ['Implementar autenticação', 'Criar testes unitários'] },
  { _id: 3, title: 'Em testes', items: ['Testar integração com API', 'Validar fluxo de pagamento'] },
  { _id: 4, title: 'Reprovado em testes', items: ['Corrigir bug no login', 'Ajustar layout no mobile'] },
  { _id: 5, title: 'Em Produção', items: ['Monitorar logs', 'Realizar deploy'] }
]
