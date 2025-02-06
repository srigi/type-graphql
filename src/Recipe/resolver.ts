import { Arg, Args, ArgumentValidationError, Mutation, Query, Resolver, Root, Subscription } from 'type-graphql';

import { pubSub } from '~/pubsub';
import { RangeArgs } from '~/common/args.range';
import { Recipe } from './Recipe';
import { FindRecipeArgs } from './args.findRecipe';
import { AddRecipeInput } from './input.addRecipe';
import { Payload, PayloadType, RecipeNotification, Topic } from './subscription';

@Resolver(Recipe)
export class RecipeResolver {
  private readonly items: Recipe[] = [
    { id: 'KDYxYg', title: 'Spaghetti Carbonara', description: 'Classic Italian pasta dish with eggs, cheese, and pancetta' },
    { id: 'MLXFxw', title: 'Chicken Tikka Masala', description: 'Creamy curry with tender chicken pieces' },
    { id: 'in3dXw', title: 'Caesar Salad', description: 'Fresh romaine lettuce with classic Caesar dressing' },
    { id: 'dGgXBQ', title: 'Beef Burger', description: 'Juicy beef patty with fresh toppings' },
    { id: 'JpOdYA', title: 'Margherita Pizza', description: 'Traditional pizza with tomatoes and mozzarella' },
    { id: 'erDDyQ', title: 'Sushi Roll', description: 'Fresh fish and rice wrapped in nori' },
    { id: 'KgT8Jw', title: 'French Onion Soup', description: 'Rich beef broth with caramelized onions' },
    { id: 'IlC8sQ', title: 'Pad Thai', description: 'Stir-fried rice noodles with tamarind sauce' },
    { id: 'Coubyg', title: 'Greek Moussaka', description: 'Layered eggplant and meat casserole' },
    { id: 'BcYotw', title: 'Fish and Chips', description: 'Crispy battered fish with thick-cut fries' },
    { id: 'BcYotw', title: 'Beef Stroganoff', description: 'Creamy beef and mushroom sauce with pasta' },
    { id: 'RgIKCg', title: 'Ramen', description: 'Japanese noodle soup with rich broth' },
    { id: 'NPhzpQ', title: 'Paella', description: 'Spanish rice dish with seafood and saffron' },
    { id: 'XHMADA', title: 'Beef Wellington', description: 'Tender beef wrapped in pastry' },
    { id: 'QTxj3w', title: 'Apple Pie', description: 'Classic American dessert with spiced apples' },
    { id: 'bUMXyw', title: 'Tiramisu', description: 'Italian coffee-flavored dessert' },
    { id: 'cUmn2w', title: 'Chocolate Cake', description: 'Rich and moist chocolate layer cake' },
  ];

  @Query((returns) => [Recipe])
  recipes(@Args(() => RangeArgs) { skip, take }: RangeArgs): Recipe[] {
    return this.items.slice(skip, skip + take);
  }

  @Query((returns) => Recipe, { nullable: true })
  recipe(@Args(() => FindRecipeArgs) args: FindRecipeArgs): Recipe | undefined {
    if (args.withId != null) {
      return this.items.find((recipe) => recipe.id === args.withId);
    }
    if (args.withTitle != null) {
      return this.items.find((recipe) => recipe.title === args.withTitle);
    }
  }

  @Mutation((returns) => Recipe)
  addRecipe(@Arg('recipe', () => AddRecipeInput) input: AddRecipeInput): Recipe {
    const existing = this.items.find((recipe) => recipe.title === input.title);
    if (existing != null) {
      throw new ArgumentValidationError([{ property: 'title', constraints: { unique: 'title must be unique' } }]);
    }

    const newRecipe = Object.assign(new Recipe(), input, { id: Math.random().toString(36).slice(2) });
    this.items.push(newRecipe);
    pubSub.publish(Topic.NOTIFICATIONS, { type: PayloadType.NEW_RECIPE, issuedAt: new Date(), recipe: newRecipe });

    return newRecipe;
  }

  @Subscription((returns) => RecipeNotification, { topics: Topic.NOTIFICATIONS })
  recipeUpdates(@Root() payload: Payload): RecipeNotification {
    return Object.assign(new RecipeNotification(), payload);
  }
}
