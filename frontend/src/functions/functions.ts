import { intl } from '@/i18n'

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    }).format(value);
}

export function materialCategoryNameConverter(materialCategory: Number) {
    let convertedMaterialCategory

    switch (materialCategory) {
      case (materialCategory = 0):
        convertedMaterialCategory = `${intl.formatMessage({
          id: 'material.category.food',
        })}`
        break
      case (materialCategory = 1):
        convertedMaterialCategory = `${intl.formatMessage({
          id: 'material.category.decoration',
        })}`
        break
      case (materialCategory = 2):
        convertedMaterialCategory = `${intl.formatMessage({
          id: 'material.category.utensils',
        })}`
        break
      case (materialCategory = 3):
        convertedMaterialCategory = `${intl.formatMessage({
          id: 'material.category.furniture',
        })}`
        break
      case (materialCategory = 4):
        convertedMaterialCategory = `${intl.formatMessage({
          id: 'material.category.humanResources',
        })}`
        break
      case (materialCategory = 5):
        convertedMaterialCategory = `${intl.formatMessage({
          id: 'material.category.realEstate',
        })}`
        break
      case (materialCategory = 6):
        convertedMaterialCategory = `${intl.formatMessage({
          id: 'material.category.entertainment',
        })}`
        break
      case (materialCategory = 7):
        convertedMaterialCategory = `${intl.formatMessage({
          id: 'material.category.marketing',
        })}`
        break
    }
    return convertedMaterialCategory
  }
  