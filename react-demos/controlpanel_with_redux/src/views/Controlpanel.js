import React,{Component} from 'react';
import Counter from './Counter';
import Summary from './Summary';

const style = {
    margin:'10px'
};

class Controlpanel extends Component{
    render(){
        return(
            <div style = {style}>
            <Counter caption = 'First'></Counter>
            <Counter caption = 'Second'></Counter>
            <Counter caption = 'Third'></Counter>
            <hr/>
            <Summary></Summary>
            </div>
        );
    }
}

export default Controlpanel;