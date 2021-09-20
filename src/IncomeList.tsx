import React from 'react';

interface ITransactionList {
    curAmount: string;
    curTitle: string;
    items: Transaction[];
    total: number;
}
class TransactionList extends React.Component<ITransactionList, ITransactionList> {
    constructor(props: any) {
        super(props);

        this.state = {
            items: [],
            curTitle: '',
            curAmount: '',
            total: 0,
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    handleTitleChange(e: any) {
        this.setState({ curTitle: e.target.value });
    }

    handleAmountChange(e: any) {
        this.setState({ curAmount: e.target.value });
    }

    addItem(e: any) {
        e.preventDefault();
        let curAmount = Number(this.state.curAmount);
        let curTitle = this.state.curTitle;
        let curTotal = this.state.total;

        if (isNaN(curAmount) || curAmount === 0 || curTitle.length === 0) return;

        const items = this.state.items;
        this.setState({
            items: items.concat(new Transaction(curTitle, curAmount)),
            total: curTotal + curAmount,
            curAmount: '',
            curTitle: '',
        });
    }

    render() {
        let list = this.state.items.map((item) => {
            return (
                <div className="field-item">
                    {item.name}: ${item.amount}
                </div>
            );
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

    constructor(name: string, amount: number) {
        this.name = name;
        this.amount = amount;
    }
}
export default TransactionList;
