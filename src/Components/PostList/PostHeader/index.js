import React from 'react';
import propTypes from 'prop-types';
import { Tabs, Button, Icon } from 'antd';



const PostHeader = (props) => {
    const ButtonGroup = Button.Group;
    const ExtraOperation = (
        <ButtonGroup>
            <Button type="ghost" onClick={props.toggleModal}>
                <Icon type="plus-circle-o" />
            </Button>
            <Button type="ghost" onClick={props.getPosts}>
                <Icon type="sync" />
            </Button>
        </ButtonGroup>
    )

    return (
        <Tabs defaultActiveKey="1" onChange={null} tabBarExtraContent={ExtraOperation}>
            {props.children}
        </Tabs>
    )
}

PostHeader.propTypes = {
    toggleModal: propTypes.func.isRequired
}

export default PostHeader;