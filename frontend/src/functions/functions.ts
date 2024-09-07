import { MaterialCategory } from '@/enuns/enuns';
import { intl } from '@/i18n'

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    }).format(value);
}

export function materialCategoryNameConverter(materialCategory: MaterialCategory) {
    let convertedMaterialCategory

    switch (materialCategory) {
      case (materialCategory = MaterialCategory.Food):
        convertedMaterialCategory = `${intl.formatMessage({
          id: 'material.category.food',
        })}`
        break
      case (materialCategory = MaterialCategory.Decoration):
        convertedMaterialCategory = `${intl.formatMessage({
          id: 'material.category.decoration',
        })}`
        break
      case (materialCategory = MaterialCategory.Utensils):
        convertedMaterialCategory = `${intl.formatMessage({
          id: 'material.category.utensils',
        })}`
        break
      case (materialCategory = MaterialCategory.Furniture):
        convertedMaterialCategory = `${intl.formatMessage({
          id: 'material.category.furniture',
        })}`
        break
      case (materialCategory = MaterialCategory.HumanResources):
        convertedMaterialCategory = `${intl.formatMessage({
          id: 'material.category.humanResources',
        })}`
        break
      case (materialCategory = MaterialCategory.RealEstate):
        convertedMaterialCategory = `${intl.formatMessage({
          id: 'material.category.realEstate',
        })}`
        break
      case (materialCategory = MaterialCategory.Entertainment):
        convertedMaterialCategory = `${intl.formatMessage({
          id: 'material.category.entertainment',
        })}`
        break
      case (materialCategory = MaterialCategory.Marketing):
        convertedMaterialCategory = `${intl.formatMessage({
          id: 'material.category.marketing',
        })}`
        break
    }
    return convertedMaterialCategory
  }
  