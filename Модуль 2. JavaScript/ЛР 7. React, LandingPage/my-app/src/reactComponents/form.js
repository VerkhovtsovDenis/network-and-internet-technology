import React, { useState } from 'react';
import Title from './title';

class InputForm extends React.Component {
    state = {
        arr: this.props.arr,
        text: "",
        isOpen: false
    };

    handleOpenChange = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }


    changeText = (event) => {
        let inputValue = event.target.value;

        if (
            this.state.text.length < inputValue.length &&
            inputValue.length > 4
        ) {
            let answ = this.state.arr.filter((item) => {
                return item.startsWith(inputValue);
            });

            if (answ.length != 0) event.target.value = answ[0];
        }
        this.setState({ text: event.target.value });
    };

    handleSubmit = (event) => {
        const textarea = document.getElementById("text");
        textarea.value = "";

        if (this.state.arr.indexOf(this.state.text) == -1) {
            this.setState(({ arr }) => ({
                arr: [...this.state.arr, this.state.text],
                text: "",
            }));
        }
        this.setState({ text: "" });
        event.preventDefault();
    };

    render() {
        return (<>
            <Title name={this.props.name} onClick={this.handleOpenChange} />
            {this.state.isOpen && (
                <div className="form">
                    <h4>
                        Вы можете записать свои результаты
                    </h4>
                    <form onSubmit={this.handleSubmit} >
                        <input type="text" id="text" onChange={this.changeText} />
                        <input type="submit" value="Отправить" />
                        <div>
                            {this.props.helpP == "1"
                                ? this.state.arr.map((value, index) => (
                                    <p>
                                        {index + 1}) {value}
                                    </p>
                                ))
                                : ""}
                        </div>
                    </form>
                </div>
            )}
        </>

        );
    }
}

const data = [

];
export default InputForm;