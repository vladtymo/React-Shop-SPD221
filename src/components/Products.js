import { List } from 'antd';
import React, { useEffect, useState } from 'react'

const api = "https://dummyjson.com/products";

export default function Products() {

    const [products, setProducts] = useState([]);

    // starts on component mount
    useEffect(() => {
        fetch(api)
            .then(res => res.json())
            .then(data => {
                console.log(data.products);
                //products = data.products; // does not update HTML
                setProducts(data.products); // update HTML
            });
    }, []);

    // starts on products changed
    // useEffect(() => {
    //     console.log("Component updated!");
    // }, [products]);

    return (
        <>
            <h1>Products List</h1>

            <List
                size="small"
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={products}
                renderItem={(i) => <List.Item>{i.title} - {i.price}$</List.Item>}
            />
            {/* <ol>
                {products.map((i, index) =>
                    <li key={i.id}>{i.title} - {i.price}$</li>
                )}
            </ol> */}
        </>
    )
}
