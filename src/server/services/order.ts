import { v4 } from 'uuid';
import { getMenu } from './menu';
import logger from '../libs/logger';

interface OrderDto
{
    id: string,
    dishes: OrderDish[]
}

interface OrderDish
{
}

const orders = [];

export const createOrder = (dishes) => {
    const menu = getMenu();

    const orderDishes = [];

    for (let dish of dishes) {
        const { id, count } = dish;
        const menuItem = menu.find(item => item.id === id);

        if (!menuItem) {
            throw new Error(`Dish with id ${id} not found`);
        }

        orderDishes.push({ dish: menuItem, count: parseInt(count) });
    }

    const order = {
        id: v4(),
        dishes: orderDishes,
        sum: orderDishes.reduce((sum, item) => sum + item.count * item.dish.price, 0),
    }

    orders.push(order);

    logger.info('Orders %o', orders);

    return order;
}
