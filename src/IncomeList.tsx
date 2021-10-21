import React from 'react';
import FrequencyField from './FrequencyField';
import type { Frequency } from './FrequencyField';

interface ITransactionList {
    curAmount: string;
    curTitle: string;
    items: Transaction[];
    total: number;
    curFreq: Frequency;
    targetFreq: Frequency;
}
class TransactionList extends React.Component<ITransactionList, ITransactionList> {
    constructor(props: any) {
        super(props);

        this.state = {
            items: [],
            curTitle: '',
            curAmount: '',
            total: 0,
            curFreq: null,
            targetFreq: 'month',
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onFreqChange = this.onFreqChange.bind(this);
    }

    onFreqChange(freq: Frequency) {
        this.setState({ curFreq: freq });
    }

    handleTitleChange(e: any) {
        this.setState({ curTitle: e.target.value });
    }

    handleAmountChange(e: any) {
        this.setState({ curAmount: e.target.value });
    }

    addItem(e: any) {
        e.preventDefault();
        const curAmount = Number(this.state.curAmount);
        const curTitle = this.state.curTitle;
        const curFrequency = this.state.curFreq;
        const curTotal = this.state.total;

        const newTransaction = new Transaction(curTitle, curAmount, curFrequency);

        if (isNaN(curAmount) || curAmount === 0 || curTitle.length === 0) return;

        const items = this.state.items;
        this.setState({
            items: items.concat(new Transaction(curTitle, curAmount, curFrequency)),
            total: curTotal + curAmount,
            curAmount: '',
            curTitle: '',
        });
    }

    render() {
        let list = this.state.items.map((item) => {
            return (
                <div className="field-item">
                    {item.name}: ${item.toFreq(this.state.targetFreq)} ({this.state.targetFreq})
                </div>
            );
            // 5/wk * wk/7day
        });
        return (
            <div className="add-income">
                <form onSubmit={this.addItem}>
                    <label htmlFor="">
                        Title
                        <input
                            className="field-input"
                            type="text"
                            value={this.state.curTitle}
                            onChange={this.handleTitleChange}
                        />
                    </label>
                    <label htmlFor="">
                        Amount
                        <input
                            className="field-input"
                            type="text"
                            value={this.state.curAmount}
                            onChange={this.handleAmountChange}
                        />
                    </label>
                    <FrequencyField
                        active={null}
                        onClick={(freq: Frequency) => this.onFreqChange(freq)}
                    />
                    <input type="submit" value="Submit" />
                </form>
                <div className="field-list">{list}</div>
                <div className="total">Total: ${this.state.total} / month</div>
            </div>
        );
    }
}

class Transaction {
    name: string;
    amount: number;
    frequency: Frequency;

    constructor(name: string, amount: number, frequency: Frequency) {
        this.name = name;
        this.amount = amount;
        this.frequency = frequency;
    }

    toDays(freq: Frequency): number | undefined {
        switch (freq) {
            case 'day':
                return 1;
            case 'week':
                return 7;
            case 'month':
                return 30;
            case 'year':
                return 365;
            case 'one time':
                return undefined;
            default:
                return undefined;
        }
    }

    toFreq(newFreq: Frequency): number | undefined | null {
        const curFreqDays = this.toDays(this.frequency);
        const newFreqDays = this.toDays(newFreq);
        return curFreqDays && newFreqDays && (newFreqDays * this.amount) / curFreqDays;
    }
}
export default TransactionList;
