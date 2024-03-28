export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}
export type CartItem = Guitar & {
    quantity: number
}
//Ejemplo de Pick en TypeScript. Se puede heredar una o mas propiedades de un Type
// export type CartItemTwo = Pick<Guitar, 'id' | 'name' | 'price'> & {
//     quantity: number
// }