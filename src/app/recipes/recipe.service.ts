import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe',
            'This is simply a test',
            'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/04/Guacamole-Recipe.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Friends', 20),
            ]),
        new Recipe(
            'Another Test Recipe',
            'This is simply a test',
            'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/04/Guacamole-Recipe.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1),
            ])
    ];

    constructor(private shoppingListService: ShoppingListService) {

    }

    getRecipes() {
        return this.recipes.slice(); // return a new copy of this array
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}