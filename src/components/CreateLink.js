import React from 'react';
import CreateLinkMutation from '../mutations/CreateLinkMutation';

export default class CreateLink extends React.Component {

    state = {
        description: '',
        url: ''
    }
    
    descriptionHandler = (e) => {
        this.setState({description: e.target.value})
    }

    urlHandler = (e) => {
        this.setState({url: e.target.value})
    }
    
    _createLink = () => {
        const postedById = localStorage.getItem(GC_USER_ID)
        if (!postedById) {
          console.error('No user logged in')
          return
        const {description,url} = this.state;
        CreateLinkMutation(description,url , () => this.props.history.push('/'))
    }
    
    render() {
        return(
         <div>
             <div className='flex flex-column mt3'>
             <input 
             className = 'mb2'
             type = 'text'
             placeholder = ' Enter your descripiton'
             value = {this.state.description}
             onChange = {this.descriptionHandler}
             />
             <input 
              className = 'mb2'
              type = 'text'
              placeholder = 'Enter your Url'
              value = {this.state.url}
              onChange = {this.urlHandler}   
             />
             </div>
             <div className = 'button' onClick = {this._createLink}> Sumbit</div>
         </div>
        );
    }
}