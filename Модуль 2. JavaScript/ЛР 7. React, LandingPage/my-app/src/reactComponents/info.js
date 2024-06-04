import React, { useState } from 'react';

import Title from "./title";

const TableRow = (props) => {
    const round = (num) => Math.round(num * 1000) / 10;

	const cells = (props.isHead == "0")
		? props.row.map((item, index) =>  <td key={index}> {index>=4&&index<=5? round(item)+"%":index==6?round(item)/100:item } </td>)
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
		<div className="info">
            <h4>
                Посещаемость сайта <a href="https://iostrov.ru/">iostrov.ru</a> за год
            </h4>
			<table>
				<TableHead head={Object.keys(props.data[0])} />
				<TableBody body={props.data} amountRows={props.amountRows} isPagination={props.isPagination} numPage={activePage} />
			</table>
			<div>
				{props.isPagination == "1"? pages : ""}
			</div>
		</div>

	)
}


function Info(props) {
    const [isOpen, setOpenClose] = React.useState(false);
    const handleOpenChange = () =>{
        setOpenClose(!isOpen)
        console.log(isOpen)
    }



    return (
        <>
            <Title name={props.name} onClick={handleOpenChange}/>
            {isOpen &&(
                <Table data={props.tableData} amountRows="10" isPagination="1" />
            )}
            

        </>
    )
}
export default Info;
