import React, {Component} from 'react'; 
import CardList from '../components/CardList'; 
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'; 
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';


//app components that have two states: robots and searchField
class App extends Component {
  //use constructor function to create this.state
  constructor(){
    super();
    //this.state is what changes in the app
    this.state = {
      robots: [], 
      searchField: ''
    }
  }

  componentDidMount() {
    //fetch whatever the users are
    fetch('https://jsonplaceholder.typicode.com/users')
      //getting the response
      .then(response=> response.json())
      //getting the users and updating the users with setState
      .then(users => this.setState({robots: users}));
  }

  //everytime input changes we get an event
  //'onSearchChange' will be passed to the 'SearchBox'
  //this function run with event and updates state of 'searchField' to 
  //whatever we type
  onSearchChange = (event) => { 
    //Changes the state and searchfield always gets updaetd
    this.setState({searchField: event.target.value})
  }

  render(){
    const { robots, searchField} = this.state;
    //filter the 'robots' state to only what was included in the 'searchField'
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
      //robots.length === 0
      return !robots.length ?
      <h1>Loading...</h1> :
      ( 
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
           {/* 'onSearchChange' passed to here
           everytime there is 'onChange' on the input, it lets app know there is a change */}
          <SearchBox searchChange ={this.onSearchChange} />
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots}/>
            </ErrorBoundary>
          </Scroll>
        </div>
      );
  }
}


export default App; 