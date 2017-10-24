import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown } from 'semantic-ui-react'

const Navigation = ({performLogout}) => {
    const activeColor = 'violet'
    return (
    	<Menu color='grey' inverted stackable size='huge'>
            <Menu.Item header color={activeColor}>Enchanted Closet</Menu.Item>
            <Menu.Menu position='right'>
                <Dropdown item text='Admin'>
                    <Dropdown.Menu>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
            <Menu.Item color={activeColor} onClick={performLogout}>Log out</Menu.Item>
	    </Menu>
    );
};

const mapStateToProps = (state) => {
    return {
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
