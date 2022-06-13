import { Component } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../connect";
import { motion } from "framer-motion";


class Form extends Component {

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onChangeAdd();
        this.props.changeLoading();

        const db = getFirestore(app);

        if (e.target.id_title.value) {
            addDoc(collection(db, "Task"), {
                title: e.target.id_title.value,
                description: e.target.id_description.value,
                checked: false
              }).then((docRef) => {
    
                  this.props.update();
              })
        }
        
    }

    render() { 
        return (
            <>
                <motion.div
                initial={{ y: -20}}
                animate={{ y: 0}}
                className="row">
                    <div className="div mb-3 offset-3 col-6">
                        <form onSubmit={(e) => this.onSubmit(e)} className="card p-4">
                            <div className="mb-3">
                                <label for="id_title" className="form-label">Titre</label>
                                <input type="text" className="form-control" id="id_title" name="title" placeholder="Mon titre" />
                            </div>
                            <div className="mb-3">
                                <label for="id_title" className="form-label">Description</label>
                                <textarea className="form-control" name="description" id="id_description" rows="3" placeholder="Ma description"></textarea>
                            </div>
                            <div>
                                <button className="btn btn-success w-100">Ajouter</button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </>
        );
    }
}
 
export default Form;