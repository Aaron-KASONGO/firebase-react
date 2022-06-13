import React from 'react';
import './App.css';
import { getFirestore, collection, getDocs} from "firebase/firestore";
import app from './connect';
import Grid from './components/grid';
import Form from './components/form';


class App  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      add: false,
      isLoading: false
    };
  }

  changeLoading = () => {
    this.setState((state) => ({
      isLoading: !state.isLoading
    }))
  }

  update() {

    const db = getFirestore(app);

    getDocs(collection(db, "Task"))
    .then((querySnapshot) => {
      let tasks = [];
      querySnapshot.forEach((doc) => {
        let task = Object.assign({id: doc.id}, doc.data());
        tasks.push(task);
      });

      this.setState({
        tasks: tasks
      })

      this.setState((state) => ({
        isLoading: true
      }))

    }, (error) => {
      console.log('Erreur !', error);
    });
    
  }

  onChangeAdd = () => {
    this.setState((state) => ({
      add: !state.add
    }))
  }


  componentDidMount() {
    this.update();
  }
  
  render() { 
    return (
      <>
        <div className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container">
                <a href="#" className="navbar-brand text-success">Todo List</a>
                <div className="navbar-collapse collaspe">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item"><a href="#" className="nav-link">Toutes les tâches</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Incomplets</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">complets</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="container py-3">
          {this.state.add && <Form update={() => this.update()} onChangeAdd={() => this.onChangeAdd()} changeLoading={() => this.changeLoading()}/>}
          <Grid tasks={this.state.tasks} onChangeAdd={() => this.onChangeAdd()} add={this.state.add} update={(task) => this.update()} isLoading={this.state.isLoading}/>
        </div>
      </>
    );
  }
}

export default App;
