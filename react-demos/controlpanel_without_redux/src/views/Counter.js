import React,{Component,PropTypes} from 'react';

const buttonStyle = {
    margin: '10px'
};

class Counter extends Component{
    constructor(props){
        super(props);

        this.state = {
            count:props.initValue
        };

        this.onClickDecrementButton = this.onClickDecrementButton.bind(this);
        this.onClickIncrementButton = this.onClickIncrementButton.bind(this);

    }

    onClickIncrementButton(){
        this.updateCount(true);
    }

    onClickDecrementButton(){
        this.updateCount(false);
    }

    updateCount(isIncrement){
        const preValue = this.state.count;
        const newValue = isIncrement? preValue+1: preValue-1;

        this.setState({count:newValue});
        this.props.onUpdate(newValue,preValue);
    }

    render(){
        const {caption} = this.props;

        return(
            <div>
                <button style = {buttonStyle} onClick = {this.onClickIncrementButton}>+</button>
                <button style = {buttonStyle} onClick = {this.onClickDecrementButton}>-</button>
                <span>{caption} count:{this.state.count}</span>
            </div>
        );
    }
}

Counter.propTypes = {
    caption: PropTypes.string.isRequired,
    initValue: PropTypes.number,
    onUpdate: PropTypes.fuc
};

Counter.defaultProps = {
    initValue:0,
    onUpdate:f =>f
};

export default Counter;