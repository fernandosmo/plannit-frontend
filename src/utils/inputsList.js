const inputsObra = [
  {
    name: "Empreendimento",
    type: "text",
    label: "Nome do empreendimento",
    placeholder: "Exemplo",
  },
  {
    name: "Endereço",
    type: "text",
    label: "Endereço",
    placeholder: "Rua Exemplo, 000",
  },
  { name: "Estado", type: "text", label: "Estado", placeholder: "SC" },
  { name: "Regiao", type: "text", label: "Região", placeholder: "Sul" },
  {
    name: "Assinatura_Contrato",
    type: "date",
    label: "Assinatura do contrato",
  },
  { name: "Alvara_Exec", type: "date", label: "Alvará de execução" },
  {
    name: "Prazo_Exec",
    type: "number",
    label: "Prazo de execução em meses",
    placeholder: "36",
  },
  { name: "Data_Final", type: "date", label: "Data final perante contrato" },
  {
    name: "prazo_exec_invest",
    type: "date",
    label: "Prazo de Execução para investidor",
  },
  { name: "Início_atividades", type: "date", label: "Início das atividades" },
  {
    name: "Coordenacao",
    type: "text",
    label: "Coordenador",
    placeholder: "Paulo",
  },
  { name: "Gestor", type: "text", label: "Gestor", placeholder: "Paulo" },
];

const inputsAtividade = [
  {
    name: "nome",
    type: "text",
    label: "Atividade",
    placeholder: "Corte de ruas",
  },
  {
    name: "ordem",
    type: "number",
    label: "Ordem de execução",
    placeholder: "1",
  },
  {
    name: "unidade",
    type: "text",
    label: "Unidade de medida",
    placeholder: "m²",
  },
];

const inputsMaterial = [
  {
    name: "descricao",
    type: "text",
    label: "Material",
    placeholder: "Tubo de concreto DN 20",
  },
  {
    name: "custo",
    type: "number",
    label: "Custo",
    placeholder: "000,00",
    money: true,
  },
  {
    name: "produtividade_dia_equipe",
    type: "number",
    label: "Produtividade por dia da equipe",
    placeholder: "100",
  },
];

export { inputsObra, inputsAtividade, inputsMaterial };
