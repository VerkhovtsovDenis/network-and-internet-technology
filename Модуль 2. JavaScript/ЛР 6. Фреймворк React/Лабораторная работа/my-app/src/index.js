import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import buildings from './data.js';


const root = ReactDOM.createRoot(document.getElementById('root'));

/*
 компонент, для вывода строки таблицы
 пропсы:
 row - данные для формирования ячеек строки таблицы в виде массива
*/


const TableRow = (props) => {
	const cells = (props.isHead == "0")
		? props.row.map((item, index) => <td key={index}> {item} </td>)
		: props.row.map((item, index) => <th key={index}> {item} </th>)
	return (
		<>
			{cells}
		</>
	)
}

const TableBody = (props) => {

	const begRange = (props.numPage - 1) * props.amountRows;
	const endRange = begRange + Number(props.amountRows);

	console.log(endRange)

	const tbody = props.body.map((item, index) =>
		<tr key={index} className={
			(props.isPagination == "0" ||
			index >= begRange && index < endRange) ? "show" : "hide"
		}>
			<TableRow row={Object.values(item)} isHead="0" />
		</tr>
	)

	return (
		<tbody>
			{tbody}
		</tbody>
	)
}

const TableHead = (props) => {
	return (
		<thead>
			<tr>
				<TableRow row={props.head} isHead="1" />
			</tr>
		</thead>
	)

}

const Table = (props) => {
	const n = Math.ceil(props.data.length / props.amountRows)
	const arr = Array.from({ length: n }, (v, i) => i + 1)

	const [activePage, setActivePage] = React.useState("1");

	const changeActive = (event) => {
		setActivePage(event.target.innerHTML)

	}

	const pages = arr.map((item, index) =>
		<span onClick={changeActive}  className={
			(index+1 == activePage) ? "active" : ""
		}>{item}</span>)

	return (
		<>
			<table>
				<TableHead head={Object.keys(props.data[0])} />
				<TableBody body={props.data} amountRows={props.amountRows} isPagination={props.isPagination} numPage={activePage} />
			</table>
			<div>
				{props.isPagination == "1"? pages : ""}
			</div>
		</>

	)
}


function Content() {
	return (
		<>
			<h3>Самые высокие здания и сооружения</h3>
			<Table data={buildings} amountRows="10" isPagination="1" />
		</>
	)
}


root.render(<Content />)