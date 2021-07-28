import {makeStyles} from '@material-ui/core/styles';

//use this to add styles for each component instead of cluttering it all inside styles.css
//add classname and attribute name must be in camelCase.
export default makeStyles(()=>({
    root: {
        maxWidth: '100%',
    },
    media:{
        height:0,
        paddingTop: '56.25%', //16:9
    },
    cardAction:{
        display:'flex',
        justifyContent: 'flex-end',
    },
    cardContent:{
        display:'flex',
        justifyContent: 'space-between',
    }, 
}));