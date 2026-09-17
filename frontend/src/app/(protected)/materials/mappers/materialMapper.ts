export const materialCategoryNameConverter = (categoryIndex: number) => {
  const categories = [
    'Comida', 'Decoração', 'Utensilios', 'Móveis',
    'Recursos humanos', 'Aluguel', 'Entretenimento', 'Marketing'
  ]
  return categories[categoryIndex] ?? 'Desconhecido'
}

export const formatCurrency = (value: string | number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value))
}