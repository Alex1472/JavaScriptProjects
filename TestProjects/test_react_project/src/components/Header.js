import PropTypes from "prop-types";
import Button from './Button';

const Header = ({ title, showAddTask, toggleShowAddTask }) => {
    
    return (
        <header className="header">
            <h1>{title}</h1>
            <Button color={showAddTask ? 'red' : 'green'} 
                    text={showAddTask ? 'Close' : 'Add'} 
                    onClick={toggleShowAddTask} />
        </header>
    );
}

Header.defaultProps = {
    title: "Test"
}
Header.propTypes = {
    title: PropTypes.string
}

export default Header;