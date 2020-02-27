import React, { Component } from "react";
import '../../stylesheets/bootstrap.min.css';
import '../../form.css';

import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class CustomDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            extra: null,
            submit_flag: false,
            isDDOpen: false,
        };
        this.selectOption = this.selectOption.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.data !== state.data || props.submit_flag !== state.submit_flag) {
            return {
                data: props.data,
                submit_flag: props.submit_flag,
                extra: props.extra
            };
        } else {
            return null;
        }
    }
    selectOption(e, index) { // You can handle reverse call here
        let { extra } = this.state;
        if (extra && extra.selectAnswer && typeof extra.selectAnswer === 'function') {
            extra.selectAnswer(this.state.data, index);
        }
    }

    render() {
        const self = this;
        const { isDDOpen, data, submit_flag } = this.state;
        let isIncorrect = submit_flag && data.select && (data.select != data.answer) ? true : false;
        return (
            <div className="list">
                <div><div className="question">
                    {data.question}
                </div>
                    <span className={isIncorrect ? 'show' : 'hide'}>Incorrect</span>
                </div>
                <div className="options">
                    <ButtonDropdown isOpen={isDDOpen} toggle={() => {
                        self.setState({ isDDOpen: !isDDOpen })
                    }}
                        disabled={submit_flag}>
                        <DropdownToggle>
                            {
                                !submit_flag && !data.select ? 'Select an Answer' : data.select || 'Select an Answer'
                            }
                        </DropdownToggle>
                        <DropdownMenu>
                            {
                                data.options.map(function (opt, i) {
                                    return (
                                        <DropdownItem key={i}
                                            onClick={() => self.selectOption(event, i)}
                                        >{opt}</DropdownItem>
                                    )
                                })
                            }
                        </DropdownMenu>
                    </ButtonDropdown>

                </div>
            </div>)
    }
}

export default CustomDropDown;