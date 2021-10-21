import React from 'react';
import TransactionList from './IncomeList';
import { Frequency } from './FrequencyField';
import './App.scss';
class App extends React.Component {
    render() {
        return (
            <div className="App">
                <TransactionList
                    curFreq={null}
                    total={0}
                    curTitle=""
                    curAmount=""
                    items={[]}
                    targetFreq={'month'}
                ></TransactionList>
            </div>
        );
    }
}

export default App;
