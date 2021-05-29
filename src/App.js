import './App.css';
import React from 'react';
import Logo from "./symbol_OK.svg";


class App extends React.Component{
  constructor(){
    super();
    this.state={
 input:"",
 list:[],
 newItem:""
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.decrementer=this.decrementer.bind(this)
  }
  handleChange(event) {
    this.setState({input: event.target.value})
    }
    handleSubmit(e){
     
      if(e.key === 'Enter' || e.key===undefined){
      const newItem={
        id:1+Math.random(),
        value:this.state.input,
        color:false
      }
      const list=[...this.state.list]
      list.push(newItem)
        this.setState({
        list,
        input:''
      })
      e.preventDefault()
    }}
    decrementer(key){
    const list=this.state.list;
    const updatedList=list;
    updatedList.splice(key,1)
      this.setState({list:updatedList})
    }
    strike(key){
      const updatedList=this.state.list
      updatedList[key]["color"]=(!updatedList[key]["color"])
     this.setState({list:updatedList})
    }
  render (){
    const {list}= this.state
    return(
      <div className="main-comp">
       <div className="inputbutton" style={{fontSize:"12px"}}>
       My To-do-tasks123: 
        
          <input className="inputklasa" type="text" value={this.state.input} onChange={this.handleChange} onKeyPress={this.handleSubmit}/>
          <button onClick={this.handleSubmit} style={{backgroundColor:"red"}} > <img src={Logo} alt="" style={{height:"1em"}}/></button>  
        
          </div>
        {list.map((val,key1)=>(
          <Task prop1={val.value} key={val.id} prop2={val.color} method={()=>this.decrementer(key1)} method2={()=>this.strike(key1)} />))}
      </div>
    );
  }
}

//------------------------------------------------
class Task extends React.Component{
  constructor(props){
    super(props)
    this.state={
      input:'',
    }
  }
  render(){
    let className1=""
if(this.props.prop2){
  className1 ='menu-active';
}
   return <div>
    <p className={className1} style={{display:'inline-flex'}} >{this.props.prop1}    </p> <button onClick={this.props.method}>X</button> <button onClick={this.props.method2}>Done</button>
    
    </div>
  }
}



export default App;
