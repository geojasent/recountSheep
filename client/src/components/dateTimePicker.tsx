import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export interface IDateConstructor {
    startDate: Date;
}

interface ITimeProps {
    time: string;
    setTime: string;
}

export class DateSelector extends React.Component<{}, IDateConstructor> {
    constructor(props: Date) {
        super(props);
        this.state = {
            startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    private handleChange(date: Date) {
        this.setState({
            startDate: date
        });
    }

    public render() {
        const { startDate } = this.state;
        return <DatePicker selected={startDate} onChange={this.handleChange} />;
    }
}
