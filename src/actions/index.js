export const addIngredient = ingredient => ({
  type: 'ADD_INGREDIENT',
  ingredient,
})

export const removeIngredient = ingredient => ({
  type: 'REMOVE_INGREDIENT',
  id: ingredient.id,
})
