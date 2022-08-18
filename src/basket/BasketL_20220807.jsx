import dummy from '../db/data.json'
import axios from 'axios';
import { useEffect, useState } from 'react';

function BasketL() {
  //console.log(dummy);
  const [items, setItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  //const [bChecked, setChecked] = useState([true]);
  
  useEffect(() => {
    const params = {
      page: 1,
      size: 100,
    };
    axios
      .get('http://localhost:8083/ecoorder/baskets', params)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.content);
        setItems(res.data.content);
        setOrderItems(res.data.content);
        //checkedProduct
      });
  }, []);

  function deleteProduct(basketId) {
    axios
      .delete('http://localhost:8083/ecoorder/baskets/'+ basketId)
      .then((res) => {
        console.log(res.data);
        location.reload();
      });
  }

  function totalPrice(product) {
    return  product.reduce((prev, current) => prev + (current.ecoProductUnitPrice * current.ecoProductQty), 0);
  }

//   let totalPrice = 0;

  // function checkedProduct(basketId, price) {
  //   setChecked(!bChecked);
  //   //checkedProduct(id, checked, price)
  //   console.log(bChecked);
  //   console.log(price);
  //   console.log(totalPrice);
  //   if (bChecked) {
  //     totalPrice = totalPrice + price;
  //   } else if (!bChecked) {
  //     totalPrice = totalPrice - price;
  //   }
  //   console.log(totalPrice);
  // }

  function createEcoOrder(e) {
    const params = {
      page: 0,
      size: 10,
    };

  }

{/* <button type="button" onClick={() => setCount((count) => count + 1)}>
  count is: {count}
</button> */}

  return <ul className="list_item">
    <h1>장바구니</h1>
    <table border={1}>
      <thead>
        <tr>
          {/* <td width="10" align="center"><input type="checkbox" /></td> */}
          <td width="100" align="center">상품명</td>
          <td width="70" align="center">수량</td>
          <td width="50" align="center">단가</td>
          <td width="50" align="center">금액</td>
          <td width="10" align="center">삭제</td>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
        <tr key={item.basketId}>
          {/* <td align="center"><input type="checkbox" onChange={() => {checkedProduct(item.basketId, item.ecoProductQty * item.ecoProductUnitPrice)}} /></td> */}
          <td>{item.ecoProductName}</td>
          <td align="center">{item.ecoProductQty}</td>
          <td align="right">{item.ecoProductUnitPrice}</td>
          <td align="rigth">{item.ecoProductQty * item.ecoProductUnitPrice}</td>
          <td align="center"><button type='submit' onClick={() => {deleteProduct(item.basketId)}}>X</button></td>
        </tr>
        ))}
      </tbody>
    </table>
    <h1> 합계 : {totalPrice(items)}</h1>
    <button type='submit' onClick={createEcoOrder}>주문하기</button>
  </ul>;
}

export default BasketL
