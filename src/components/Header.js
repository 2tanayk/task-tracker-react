import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = (props) => {
    const location = useLocation()

    return (
        <header className='header'>
            {/* style={headingStyle} */}
            <h1>{props.title}</h1>
            {location.pathname === '/' && (<Button color={props.showAdd ? 'red' : 'green'} text={props.showAdd ? 'Close' : 'Add'} onClick={props.onAdd}/>)}
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
