import PropTypes from 'prop-types'
import Button from './Button'
const Header = (props) => {

    const onClick= ()=>{
        console.log('click')
    }
    
    return (
        <header className='header'>
            {/* style={headingStyle} */}
            <h1>{props.title}</h1>
            <Button color='green' text='Add' onClick={onClick}/>
        </header>
    )
}

Header.defaultProps = {
    title:'Task Tracker'
}

//will give a warning in the console in case something other than a string is passed & if no prop is passed
Header.propTypes = {
    title:PropTypes.string.isRequired
}
//CSS in JS
// const headingStyle ={
//     color:  'red',
//     backgroundColor:'black'
// }
export default Header
