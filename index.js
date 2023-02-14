/*
Jr Fullstack Developer Test - Webcat

Welcome to the Technical test for Jr Fullstack Developer

We hope that everything is fully clear and understandable.
However, if you have any questions, please send us an email
to support@webcat.app with the subject "Jr Fullstack Test Questions"
*/

import $t from './libs/test.js'

/*
1. Data manipulation:
  1. Transform the source data to the target data.
  2. Return the target data.

  Source data:
    You can inspect the source data at /libs/1-source-data.js
  Target Data:
    {
      balance: 1606400,
      income: 3900000,
      expenses: 2293600,
      byCategories: {
        Restaurants: -43600,
        Income: 3900000,
        Groceries: -250000,
        Rent: -2000000
      }
    }

  Hint: Use native array methods as well as
    Lodash(https://lodash.com/docs) modules.
*/
import _ from 'lodash'
const source = $t.source(1)
$t.answer(1, async () => {
  // Define an initial object called 'target' with the properties that we're going to use
  let target = {
    balance: 0,
    income: 0,
    expenses: 0,
    byCategories:{}    
  }
  // Use the 'reduce' function to iterate over the 'source' array and update the 'target' object  
  return _.reduce(source, (accumulated, n) => {
    // If the transaction type is 'income', update the 'income' property of the 'target' object
    if (n.type === 'income') {
      accumulated.income += n.amount;
    }
    // If the transaction type is 'expense', update the 'expenses' property of the 'target' object
    else if (n.type === 'expense') {
      accumulated.expenses += n.amount;
      // If the category property for the transaction doesn't exist yet, initialize it to 0
      accumulated.byCategories[n.category] = accumulated.byCategories[n.category] || 0;
      // Then subtract the transaction amount from the corresponding category property in the 'target' object
      accumulated.byCategories[n.category] -= n.amount;
    }
    // Update the 'balance' property of the 'target' object by subtracting 'expenses' from 'income'
    accumulated.balance = accumulated.income - accumulated.expenses;
    // Update the 'Income' property of the 'byCategories' property with the current value of 'income'
    accumulated.byCategories.Income = accumulated.income;
    // Return the 'accumulated' object for the next iteration of the 'reduce'
    return accumulated;
  }, target);
})

/*
2. Asynchronous programming: 
  1. First get the list of ids from the async function $source.getIds()
  2. Then, for every id call the async function $source.getText(id) to get its text
  3. Finally, return the list of resulting texts as an array.
    
*/
const $source = $t.source(2)
$t.answer(2, async () => {
    try {
      let array = [];      
      // 1. Get ids: $source.getIds()
      let result = await $source.getIds();
      result.forEach(res => {
        // 2. Get text for every id: $source.getText(id)
        array.push($source.getText(res))
      });
      // 3. Return array of texts
      return $source.getAnswer(array)
    } catch (error) {
      console.log('Error')
    }
})