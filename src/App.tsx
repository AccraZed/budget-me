import React from 'react';
import TransactionList from './IncomeList';
import './App.scss';
class App extends React.Component {
    render() {
        return (
            <div className="App">
                <TransactionList
                    frequency={null}
                    total={0}
                    curTitle=""
                    curAmount=""
                    items={[]}
                ></TransactionList>
            </div>
        );
    }
}

export default App;
