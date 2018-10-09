import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {  compose, branch, renderComponent} from 'recompose'
import _ from 'lodash'


import YesNoForm from './yes-no-form'
import MultipleChoiceForm from './multiplechoice-form'

 
class RenderFormType extends React.Component {
    constructor(props){
        super(props)
        this.state ={};

        this.renderFormType = this.renderFormType.bind(this)
    }

    renderFormType(){
        if (this.props.yesNoCheckBox && !this.props.multipleChoiceCheckBox){
            console.log('HITTING YES NO')
            return <YesNoForm {...this.props}/>
        }
        if (this.props.multipleChoiceCheckBox && !this.props.yesNoCheckBox){
            console.log('HITTING MC')
            return <MultipleChoiceForm {...this.props}/>
        }
    }
    render(){
        return(
            <div>
                {this.renderFormType()}
                {null}
            </div>
        )
    }
}

  

  export default RenderFormType
