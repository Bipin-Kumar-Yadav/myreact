import React, { useEffect, useState } from 'react'
import "./style.css"
// geting the data from to do list
const getLocalData =() =>{
    const list=localStorage.getItem("mylist");
    if(list){
        return JSON.parse(list);
    }
    else{
        return [];
    }
}
const Todo = () => {
    const [inputdata, setInputData] = useState("");//to get input
    const [items,setItems]=useState(getLocalData()); // to store input in an array
    const [isEditItem,setIsEditItem]= useState(""); // to store the index of item that is about to edit
    const [toggleButton,setToggleButton] = useState(false); // to change the icon of input area

    // adding item
    const addItem = () => {
        if (!inputdata) {
            alert("Input Should be non empty");
        }
        else if(inputdata && toggleButton){
            setItems(items.map((curElem)=>{
                if(curElem.id === isEditItem){
                    return {...curElem,name:inputdata};
                }
                return curElem;
            }))
            setInputData("");
            setToggleButton(false);
            setIsEditItem(null);
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
            }
            setItems([...items,myNewInputData]);
            setInputData("");
        }
    }
    //deleting item
    const deleteItem=(index)=>{
        const updatedItem= items.filter((curElem)=>{
            return curElem.id !== index;
        })
        setItems(updatedItem);
    }
    //editing item
    const editItem=(index)=>{
        const editedItem=items.find((curElem)=>{
            return curElem.id === index;
        })
        setInputData(editedItem.name);
        setIsEditItem(index);
        setToggleButton(true);
    }
    // removing all 
    const removeAll =()=>{
        setItems([]);
    }
    //setting localstorage
    useEffect(()=>{
        localStorage.setItem("mylist",JSON.stringify(items));
    },[items]);
    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src='./images/todo.svg' alt='todologo'></img>
                        <figcaption>Add Your List Here</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input placeholder='✍ Add item' type='text' className='form-control' value={inputdata} onChange={(event) => setInputData(event.target.value)}></input>
                        {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>) : (<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
                    </div>
                    <div className='showItems'>
                    {items.map((curElem)=>{
                        return (
                            <div className='eachItem' key={curElem.id}>
                            <h3>{curElem.name}</h3>
                            <div className='todo-btn'>
                                <i className="far fa-edit add-btn" onClick={()=>editItem(curElem.id)}></i>
                                <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)}></i>

                            </div>
                        </div>
                        )
                    })}
                        
                    </div>
                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                            <span>Check List</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
