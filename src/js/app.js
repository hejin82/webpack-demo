import $ from 'jquery';
import add from './modules/add';
import tax from './modules/tax';
import '../scss/style.scss';

const item1Price = 400;
const itemsPrice = 600;
const totalPrice = add(item1Price, itemsPrice);
const salesTax = 1.08;
const priceIncludeTax = tax(totalPrice, salesTax);

$('body').text(priceIncludeTax);
