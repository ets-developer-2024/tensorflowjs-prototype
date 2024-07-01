// js/data.js

// Placeholder data for demonstration purposes
const data = [
    {"date": "2023-01-01", "supplier": "Supplier A", "product": "Product 1", "price": 100},
    {"date": "2023-01-02", "supplier": "Supplier A", "product": "Product 1", "price": 105},
    {"date": "2023-01-03", "supplier": "Supplier A", "product": "Product 1", "price": 110},
    {"date": "2023-01-04", "supplier": "Supplier A", "product": "Product 2", "price": 150},
    {"date": "2023-01-05", "supplier": "Supplier A", "product": "Product 2", "price": 155},
    {"date": "2023-01-06", "supplier": "Supplier A", "product": "Product 2", "price": 160},

    {"date": "2023-01-01", "supplier": "Supplier B", "product": "Product 1", "price": 100},
    {"date": "2023-01-02", "supplier": "Supplier B", "product": "Product 1", "price": 100},
    {"date": "2023-01-03", "supplier": "Supplier B", "product": "Product 1", "price": 98},
    {"date": "2023-01-04", "supplier": "Supplier B", "product": "Product 2", "price": 148},
    {"date": "2023-01-05", "supplier": "Supplier B", "product": "Product 2", "price": 147},
    {"date": "2023-01-06", "supplier": "Supplier B", "product": "Product 2", "price": 149},
    
    {"date": "2023-01-01", "supplier": "Supplier C", "product": "Product 1", "price": 102},
    {"date": "2023-01-02", "supplier": "Supplier C", "product": "Product 1", "price": 101},
    {"date": "2023-01-03", "supplier": "Supplier C", "product": "Product 1", "price": 103},
    {"date": "2023-01-04", "supplier": "Supplier C", "product": "Product 2", "price": 152},
    {"date": "2023-01-05", "supplier": "Supplier C", "product": "Product 2", "price": 151},
    {"date": "2023-01-06", "supplier": "Supplier C", "product": "Product 2", "price": 153},

    {"date": "2023-01-01", "supplier": "Supplier D", "product": "Product 1", "price": 105},
    {"date": "2023-01-02", "supplier": "Supplier D", "product": "Product 1", "price": 104},
    {"date": "2023-01-03", "supplier": "Supplier D", "product": "Product 1", "price": 106},
    {"date": "2023-01-04", "supplier": "Supplier D", "product": "Product 2", "price": 155},
    {"date": "2023-01-05", "supplier": "Supplier D", "product": "Product 2", "price": 154},
    {"date": "2023-01-06", "supplier": "Supplier D", "product": "Product 2", "price": 156},
];


// for (let i = 0; i < 70; i++) {
//     const date = new Date(2023, 0, (i % 31) + 1).toISOString().split('T')[0];
//     const supplier = `Supplier ${String.fromCharCode(65 + (i % 4))}`;
//     const product = `Product ${1 + (i % 5)}`;
//     const price = 100 + Math.round(Math.random() * 10);
//     data.push({date, supplier, product, price});
// }

function preprocessData(data) {
    const dates = data.map(d => new Date(d.date).getTime());
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);
    const normalizedDates = dates.map(date => (date - minDate) / (maxDate - minDate));

    const suppliers = data.map(d => d.supplier === 'Supplier A' ? 0 : d.supplier === 'Supplier B' ? 1 : d.supplier === 'Supplier C' ? 2 : d.supplier === 'Supplier D' ? 3 : 4);
    
    const prices = data.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const normalizedPrices = prices.map(price => (price - minPrice) / (maxPrice - minPrice));


    const xs = tf.tensor2d(normalizedDates.map((d, i) => [d, suppliers[i]]));
    const ys = tf.tensor2d(normalizedPrices, [normalizedPrices.length, 1]);

    return {  xs, ys, minPrice, maxPrice };
}