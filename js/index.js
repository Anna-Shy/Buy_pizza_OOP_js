'use strict';

let cart = [];

class Pizza {
  constructor(size, type) {
    this.size = size;
    this.type = type;

    if (!this.size || !this.type) {
      throw new PizzaException(
        `Required two arguments, given ${arguments.length}`
      );
    }

    if (
      !Pizza.allowedSizes.includes(size) ||
      !Pizza.allowedTypes.includes(type)
    ) {
      throw new PizzaException('Invalid type');
    }
  }

  addExtraIngredient(ingredient) {
    if (
      this.type === Pizza.TYPE_VEGGIE &&
      ingredient.name === Pizza.EXTRA_MEAT.name
    ) {
      throw new PizzaException('Invalid ingredient');
    }

    if (!ingredient) {
      throw new PizzaException('Invalid ingredient');
    }

    if (cart.includes(ingredient)) {
      throw new PizzaException('Dublicate ingredient');
    }

    cart.push(ingredient);

    this.type.price += ingredient.price;
    return this.type.price;
  }

  removeExtraIngredient(ingredient) {
    cart.pop(ingredient);

    this.type.price -= ingredient.price;
    return this.type.price;
  }

  getSize() {
    return this.size.name;
  }

  getPrice() {
    return this.size.price + this.type.price;
  }

  getExtraIngredients() {
    for (let index = 0; index < cart.length; index++) {
      cart[index] = cart[index].name;
    }

    return cart;
  }

  getPizzaInfo() {
    return `Size: ${this.size.name}, type: ${
      this.type.name
    }; extra ingredients: ${this.getExtraIngredients()}; price: ${this.getPrice()}UAH`;
  }
}

class PizzaException {
  constructor(log) {
    this.log = log;
  }
}

// Sizes, types and extra ingredients 
Pizza.SIZE_S = { name: 'small', price: 50 };
Pizza.SIZE_M = { name: 'medium', price: 75 };
Pizza.SIZE_L = { name: 'large', price: 100 };

Pizza.TYPE_VEGGIE = { name: 'veggie', price: 50 };
Pizza.TYPE_MARGHERITA = { name: 'margarita', price: 60 };
Pizza.TYPE_PEPPERONI = { name: 'pepperoni', price: 70 };

Pizza.EXTRA_TOMATOES = { name: 'tomatoes', price: 5 };
Pizza.EXTRA_CHEESE = { name: 'cheese', price: 7 };
Pizza.EXTRA_MEAT = { name: 'meat', price: 9 };

// Allowed properties 
Pizza.allowedSizes = [Pizza.SIZE_S, Pizza.SIZE_M, Pizza.SIZE_L];
Pizza.allowedTypes = [
  Pizza.TYPE_VEGGIE,
  Pizza.TYPE_MARGHERITA,
  Pizza.TYPE_PEPPERONI
];

Pizza.allowedExtraIngredients = [
  Pizza.EXTRA_TOMATOES,
  Pizza.EXTRA_CHEESE,
  Pizza.EXTRA_MEAT
];
