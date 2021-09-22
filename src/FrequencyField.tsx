import React from 'react';

type Frequency = null | 'one time' | 'day' | 'week' | 'month' | 'year';

interface IFrequencyField {
    active: Frequency;
    onClick: Function;
}

class FrequencyField extends React.Component<IFrequencyField, IFrequencyField> {
    constructor(props: any) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event: any) {
        this.props.onClick(event.target.value);
    }

    render() {
        return (
            <label htmlFor="">
                Frequency
                <div className="dropdown">
                    <select id="dropdown-select" onChange={this.onChange}>
                        <option selected={true}>---</option>
                        <option value="one time" className="dropdown-option">
                            One Time
                        </option>
                        <option value="day" className="dropdown-option">
                            Daily
                        </option>
                        <option value="week" className="dropdown-option">
                            Weekly
                        </option>
                        <option value="month" className="dropdown-option">
                            Monthly
                        </option>
                        <option value="year" className="dropdown-option">
                            Yearly
                        </option>
                    </select>
                </div>
            </label>
        );
    }
}

export default FrequencyField;
export type { Frequency };
