import { Link } from 'react-router-dom';

function Hearder() {

  return <ul>
    <li><Link to="basket">Basket</Link></li>
    <li><Link to="basketlist"> BasketList</Link></li>
    {/* <li><Link to="ecoorder">EcoOrder</Link></li> */}
    <li><Link to="ecoorderlist"> EcoOrderList</Link></li>
    {/* <li><Link to="payment"> Payment</Link></li> */}
    <hr style={{height: '5px'}}/>
  </ul>
}

export default Hearder