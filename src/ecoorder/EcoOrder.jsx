import dummy from '../db/data.json'
import axios from 'axios';
import Modal from '../component/Modal.jsx';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { useLocation } from "react-router";
import { useNavigate } from 'react-router-dom';

function EcoOrder() {
  const location = useLocation();
  const orderItems = location.state.items;
  console.log(orderItems);

  let v_paymentKind = '';
  let v_paymentMethod = '';
  let v_totalPrice = 0;
  let v_message = '';

  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [usePoint, setUsePoint] = useState(0);
  const [ecoPoint, setEcoPoint] = useState(10000);
  const [modalOpen, setModalOpen] = useState(false);

  function selectPaymentKind(e) {
    v_paymentKind = e.target.value;
  }

  function selectPaymentMethod(e) {
    v_paymentMethod = e.target.value;
  }

  function changePoint(e) {
    if (e.target.value > ecoPoint) {
      setUsePoint(ecoPoint)
      e.target.value = ecoPoint;
    } else {
      setUsePoint(e.target.value)
    };
  }
    
  function calTotalPrice(product) {
    v_totalPrice = product.reduce((prev, current) => prev + (current.ecoProductUnitPrice * current.ecoProductQty), 0);
    return v_totalPrice;
  }

  const openModal = () => {
    if (v_paymentKind == '') {
      setModalOpen(true);
      v_message = '결제수단을 선택하세요.';
    } else if (v_paymentMethod == '') {
      setModalOpen(true);
      v_message = '할부선택을 선택하세요.';
    } else {
      setModalOpen(false);
    }
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return <ul className="list_item">
    <h1>주문</h1>
    <table border={'1px'} bordercollapse={'collapse'}>
      <thead>
        <tr>
          <td width="150" align="center">상품명</td>
          <td width="100" align="center">수량</td>
          <td width="100" align="center">단가</td>
          <td width="100" align="center">금액</td>
        </tr>
      </thead>
      <tbody>
        {orderItems.map(orderItem => (
        <tr key={orderItem.basketId}>
          <td>{orderItem.ecoProductName}</td>
          <td align="center">{orderItem.ecoProductQty}</td>
          <td align="right">{orderItem.ecoProductUnitPrice}</td>
          <td align="right">{orderItem.ecoProductQty * orderItem.ecoProductUnitPrice}</td>
        </tr>
        ))}
      </tbody>
    </table>
    <h3>배송지 <button>배송지 변경</button></h3> 
    <table>
      <tbody>
        <tr>
          <td>우편번호</td>
          <td><input placeholder='zipcode'/></td>
        </tr>
        <tr>
          <td>주소</td>
          <td><input placeholder='address'/></td>
        </tr>
        <tr>
          <td>상세주소</td>
          <td><input placeholder='address detail'/></td>
        </tr>
      </tbody>
    </table>
    <h3>포인트</h3>
    <table>
      <tbody>
        <tr>
          <td>에코포인트</td>
          <td><input placeholder='0' onChange={changePoint}/> </td>
          <td>사용가능 포인트 {ecoPoint} 원</td>
        </tr>
      </tbody>
    </table>
    <h3>결제방법</h3>
    <table>
      <tbody>
        <tr>
          <td>결제수단</td>
          <td>
            <select name='paymentKind' onChange={selectPaymentKind}>
                <option value="">선택</option>
                <option value="CARD">카드</option>
                <option value="CASH">현금</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>할부선택</td>
          <td>
            <select name='paymentMethod' onChange={selectPaymentMethod}>
                <option value="">선택</option>
                <option value="LUMPSUM">일시불</option>
                <option value="3MONTHS">3개월</option>
                <option value="6MONTHS">6개월</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <h1> 주문금액 : {calTotalPrice(orderItems)} 원</h1>
    <h2> 에코포인트 : {usePoint} 원</h2>
    <h1> 결제금액 : {v_totalPrice - usePoint} 원</h1>
    <button type='submit' onClick={(checkOrder) => {navigate('/basketlist/ecoorder/payment', {
                                             state: {
                                              orderItems: orderItems,
                                              deliveryId: 1,
                                              ecoPoint: ecoPoint,
                                              paymentKind: v_paymentKind,
                                              paymentMethod: v_paymentMethod,
                                              totalPrice: v_totalPrice - usePoint,
                                              },})}}>결제하기</button>

    <button onClick={openModal}>test</button>
    <Modal open={modalOpen} close={closeModal} header="Modal heading">
      {v_message} 을 선택하세요.
    </Modal>
  </ul>;
}

export default EcoOrder
