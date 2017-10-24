import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown } from 'semantic-ui-react'

const Navigation = ({performLogout, loggedIn}) => {
    const activeColor = 'violet'
    return (
    	<Menu color='grey' inverted stackable size='huge'>
            <Menu.Item header color={activeColor}>Enchanted Closet</Menu.Item>
            {loggedIn &&
            <div>
                <Menu.Menu position='right'>
                    <Dropdown item text='Admin'>
                        <Dropdown.Menu>
                            <Dropdown.Item>Dashboard</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
                <Menu.Item color={activeColor} onClick={performLogout}>Log out</Menu.Item>
            </div>
            }
            {!loggedIn &&
            <Menu.Item position='right' active color={activeColor} onClick={performLogout}>Log In</Menu.Item>
            }
	    </Menu>
    );
};

const mapStateToProps = (state) => {
    return {
        loggedIn: false
    };
};

const mapDispatchToProps = (dispatch ) => ({
    performLogout() {
        console.log('Will logout');
        return {};
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation);
