import React, { ReactElement, useRef, useState } from 'react';
import './../css/App.css';

type Data = {
  Quantity: number;
  Product: string;
  Price: number;
}[];

const dataKey = "data-treasurer";

const App: React.FC<any> = (Props): ReactElement | null =>
{
  const stringStorage = localStorage.getItem(dataKey);
  const [datas, setDatas] = useState<Data>(() => { if(stringStorage) return JSON.parse(stringStorage); });
  const [quantity, setQuantity] = useState(() => 1);
  const price = useRef(1);
  const productName = useRef("Ice Cream (Vanilla)");

  if(!stringStorage)
  {
    setUpLocalStorage();
    return null;
  }

  return (
  <div className = 'App'>
    <h1>Treasurer</h1>
    <table>
      <tbody>
        <tr>
          <th>Quantity</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Total</th>
          <th>Remove</th>
        </tr>
        {datas.map((data, Index) =>
          <tr key = {Index}>
            <td>{data.Quantity}</td>
            <td>{data.Product}</td>
            <td>{data.Price}</td>
            <td>{data.Quantity * data.Price}</td>
            <td className = 'removeButton'>
              <button onClick = {() => 
                setDatas(prev => 
                {
                  prev = prev.filter((_, i) => i !== Index);
                  localStorage.setItem(dataKey, JSON.stringify(prev));
                  return [...prev];
                })
              }> X
              </button>
            </td>
          </tr>)
        }
        <tr>
          <th>Total</th>
          <th/><th/>
          <th>{datas.reduce((total, data) => total + (data.Quantity * data.Price), 0)}</th>
        </tr>
      </tbody>
    </table>

    <div className='Add'>
      <label>Product Name: </label>
      <select onChange={e => productName.current = e.target.value}>
        <option>Ice Cream {"(Vanilla)"}</option>
        <option>Ice Cream {"(Chocolate)"}</option>
        <option>Ice Cream {"(Cookies and Cream)"}</option>        
      </select>
      <label>Price: </label>
      <input type = "number" step = "0.1" onChange={e =>
        price.current = Number(e.target.value)
      }/>
      <label>Quantity: {quantity}</label>
      <input type="range" min="0" max="20" step = "1" value = {quantity} onChange={e =>
        setQuantity(() => Number(e.target.value))
      }/>
      <button onClick={() =>
        setDatas(prev =>
        {
          if(prev.includes({Quantity: quantity, Product: productName.current, Price: price.current}))
            return prev;

          prev = [...prev, ({Quantity: quantity, Product: productName.current, Price: price.current})];
          localStorage.setItem(dataKey, JSON.stringify(prev));
          return [...prev];
        })
      }>Add</button>
    </div>
  </div>);
}

function setUpLocalStorage()
{
  const data: Data = [];
  localStorage.setItem(dataKey, JSON.stringify(data));
}

export default App;
