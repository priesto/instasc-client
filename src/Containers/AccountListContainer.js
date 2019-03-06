import React from 'react';
import AccountList from '../Components/AccountList';
import AccountModal from '../Components/AccountList/AccountModal';

class AccountListContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeAccount: '',
            modalVisible: false
            //accounts: []
        }

        this.switchActive = this.switchActive.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        //this.updateAccountsState = this.updateAccountsState.bind(this);
    }
    
/*     async componentDidMount() {
        try {
            const app_token = sessionStorage.getItem('app-token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${app_token}`;

            const response = await axios.get('/accounts');
            sessionStorage.setItem('accounts', JSON.stringify(response.data));
            this.setState({accounts: response.data});
        } catch (e) {
            console.error(e);
        }
    } */

    switchActive(id){
        this.setState((prevState, props) => {
            if(prevState.activeAccount === id) return;
            else return { activeAccount: id };
        })
    }

    toggleModal() { this.setState({modalVisible: !this.state.modalVisible}); }
    
/*     updateAccountsState(accounts) {
        this.setState({accounts: accounts});
    } */

    render(){
        return (
            <AccountList
                //accounts={this.state.accounts}
                accounts={this.props.accounts}
                activeAccount={this.state.activeAccount}
                switchActive={this.switchActive}
                toggleModal={this.toggleModal}
            >
                <AccountModal
                    visible={this.state.modalVisible}
                    toggleModal={this.toggleModal}
                    //updateAccountsState={this.updateAccountsState}
                    updateAccountsState={this.props.updateAccounts}
                />
            </AccountList>
        )
    }

}

export default AccountListContainer;