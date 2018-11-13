import React from 'react';
import {  compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles';


import {
    Button,
CardContent,
Typography,} from '@material-ui/core'

const styles = theme =>({
    voteButtonTitleText: {
        color:'#fff',
        backgroundColor:'#000',
        width:'20%',
        fontSize:30,
      },
    voteButtonOptionText: {
        color:'#fff',
        backgroundColor:'#000',
        wordBreak: 'break-all',
        fontSize:20,
        width:'80%',
      },
    answerOption:{
        textAlign:'center',
            margin:15,
            textAlign: 'center',
            backgroundColor: '#000',
            color:"#fff",
            fontFamily: [
              'Play',
              'Roboto',
              'Arial',
              'sans-serif',
            ].join(','),
            border:'1px solid black',
            margin:'1em auto',
            width:'60%',
            height:'4em',
            textAlign:'center',
            fontSize: 20,
            pointerEvents:'none'

          }
})


const AnswerOptionsDisplay = ({...props}) =>{
    console.log('PROPS ON ANSWER OPTIONS DISPLAY', props)
    return (
    <div>
    <CardContent>
            <div>
             {Object.keys(props.categories).map((category, key)=>
                 <Button 
                 variant="outlined"
                 className={props.classes.answerOption}
                 >
                 {props.type=='MC'?
                 <div>
                    <Typography 
                        className={props.classes.voteButtonTitleText}
                    > {category}: 
                    </Typography>
                    <Typography 
                        className={props.classes.voteButtonOptionText}
                    > {props.categories[category]}
                    </Typography>
                </div>:
                <Typography 
                    className={props.classes.voteButtonOptionText}
                    > {props.categories[category]}
                </Typography>
                }
                </Button>
             )}   
             </div>
        </CardContent>
    </div>
    )
}


export default compose(
    withStyles(styles, {withTheme:true}),
)(AnswerOptionsDisplay);