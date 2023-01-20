const inputs = [
  {
    name: 'Empreendimento',
    type: 'text',
    label: 'Nome do empreendimento',
    placeholder: 'Exemplo',
  },
  {
    name: 'Endereço',
    type: 'text',
    label: 'Endereço',
    placeholder: 'Rua Exemplo, 000',
  },
  { name: 'Estado', type: 'text', label: 'Estado', placeholder: 'SC' },
  { name: 'Regiao', type: 'text', label: 'Região', placeholder: 'Sul' },
  {
    name: 'Assinatura_Contrato',
    type: 'date',
    label: 'Assinatura do contrato',
  },
  { name: 'Alvara_Exec', type: 'date', label: 'Alvará de execução' },
  {
    name: 'Prazo_Exec',
    type: 'number',
    label: 'Prazo de execução em meses',
    placeholder: '36',
  },
  { name: 'Data_Final', type: 'date', label: 'Data final perante contrato' },
  {
    name: 'prazo_exec_invest',
    type: 'date',
    label: 'Prazo de Execução para investidor',
  },
  { name: 'Início_atividades', type: 'date', label: 'Início das atividades' },
  {
    name: 'Coordenacao',
    type: 'text',
    label: 'Coordenador',
    placeholder: 'Paulo',
  },
  { name: 'Gestor', type: 'text', label: 'Gestor', placeholder: 'Paulo' },
];

export default inputs;
