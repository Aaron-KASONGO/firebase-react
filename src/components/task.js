import { Component } from "react";
import app from '../connect';
import { getFirestore,doc, deleteDoc, setDoc } from "firebase/firestore";
import '../loadTask.css';
import { motion } from "framer-motion";


class Task extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdate: false,
            isChecked: false
        }
    }
    
    delete = (data) => {
        this.setState((state) => ({
            isUpdate: !state.isUpdate
        }))

        const db = getFirestore(app);

        deleteDoc(doc(db, "Task", data.id)).then(() => {

            this.props.update();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    updateCheck = (data) => {
        this.setState((state) => ({
            isChecked: !state.isChecked
        }))

        const db = getFirestore(app)

        setDoc(doc(db, "Task", data.id), {
            title: data.title,
            description: data.description,
            checked: !data.checked
          }).then(() => {
            this.props.update();

            this.setState((state) => ({
                isChecked: !state.isChecked
            }))

          }).catch((error) => {
              console.error("Error removing document: ", error);
          });
    }

    render() { 
        return ( 
            <>
                <motion.div
                whileHover={{
                    scale: 1.01,
                    transition: { duration: 0.1},
                  }}                
                className="col-12">
                    <div className="card py-2">
                        <div className="body">
                            <div className="row">
                                
                                {
                                    this.state.isUpdate ? (
                                        <div className="mx-auto text-center text-success">
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="col-9 text-muted">
                                                <span className="ms-2">
                                                    {this.props.task.title}
                                                </span>
                                            </div>
                                            <div className="col-1">
                                                <a href="#" className="text-success" onClick={() => this.updateCheck(this.props.task)}>
                                                    {
                                                        
                                                        this.state.isChecked ? (
                                                            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                                                        ) : (
                                                            this.props.task.checked ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                                                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                                                                </svg>
                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
                                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
                                                                </svg>
                                                            )
                                                        )
                                                    }
                                                </a>
                                            </div>
                                            <div className="col-1">
                                                <span onClick={() => {this.delete(this.props.task)}} className="text-danger">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                    </svg>
                                                </span>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </motion.div>
            </>
         );
    }
}
 
export default Task;