import './App.css';
import React from 'react';
import Logo from "./symbol_OK.svg";
import axios from 'axios';

class App extends React.Component{
  constructor(){
    super();
    this.state={
 input:"",
 list:[],
 newlistforAPI:[], //taa e lista za GET request od mockAPI
 newItem:"",
 TrialArray:["apple","banana","orange"],
 c:false //pomosna promenlva za da se setira obratno od segasno vo PUT method AXIOS
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.decrementer=this.decrementer.bind(this)
    this.getDatafromAPI=this.getDatafromAPI.bind(this)
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
      //Sakaam da napravam POST request so Axios
      const novinput=this.state.input
      axios.post(`https://60b6922c17d1dc0017b8811c.mockapi.io/api/v1/tasks/`, {novinput})
      .then(res => {
       /* console.log(res.data);*/})
      .then(() => { // when put is finished, the fire get
        return this.componentDidMount()})
      // Do tuka e POST requesto
      e.preventDefault();
    }  }
    decrementer=async(key)=>{
    const list=this.state.list;
    const updatedList=list;
    updatedList.splice(key,1)
      this.setState({list:updatedList}) 
      //API REQUEST
      let a = Number(this.state.newlistforAPI[key]["id"])
       await axios.delete(`https://60b6922c17d1dc0017b8811c.mockapi.io/api/v1/tasks/${a}`)
      .then(res => {
      const newlistforAPI=this.state.newlistforAPI.filter((item=> Number(item.id)!==a ))
      this.setState({newlistforAPI})
      })}
    strike=async(key)=>{    
     let a = Number(this.state.newlistforAPI[key]["id"])
      await axios.get(`https://60b6922c17d1dc0017b8811c.mockapi.io/api/v1/tasks/${a}`)
     .then(res =>{
      let c1=res.data["color"]
      this.setState({c:c1})})
     axios.put(`https://60b6922c17d1dc0017b8811c.mockapi.io/api/v1/tasks/${a}`,
     {color:!this.state.c })
     .then(response=>{     
      let b=[...this.state.newlistforAPI]
      b[key]["color"]=!this.state.c
      this.setState({newlistforAPI:b})  })
      this.getDatafromAPI(); }
      componentDidMount(){
        this.getDatafromAPI();} // This is how we make GET request with Axios 
    getDatafromAPI= async()=>{
      let array=[];
      await axios.get('https://60b6922c17d1dc0017b8811c.mockapi.io/api/v1/tasks/')
      .then(response => {
         response.data.map(obj=>{  
          let a ={
            input:obj["novinput"],
            id:obj["id"],
            color:obj["color"]
          }
          array.push(a)
          this.setState({
            newlistforAPI:array
          }) } )})
    }
    
  render (){
    //const {list}= this.state
    const {newlistforAPI}=this.state   
    return(
      <div className="main-comp"> 
       <div className="inputbutton" style={{fontSize:"12px"}}>
       My To-do-tasks:        
          <input className="inputklasa" type="text" value={this.state.input} onChange={this.handleChange} onKeyPress={this.handleSubmit}/>
          <button onClick={this.handleSubmit} style={{backgroundColor:"red"}} > <img src={Logo} alt="" style={{height:"1em"}}/></button>  
          </div>           
{newlistforAPI? newlistforAPI.map((val,key1,key)=>(
  <Task prop1={val.input} key={val.id} prop2={val.color} method={()=>this.decrementer(key1)} method2={()=>this.strike(key1)}/>
)):""}
      </div>
    );  }}
//------------------------------------------------
class Task extends React.Component{
  constructor(props){
    super(props)
    this.state={
      input:'',
    } }
  render(){
    let className1=""
if(this.props.prop2){
  className1 ='menu-active';
}
   return <div>
    <p className={className1} style={{display:'inline-flex'}} >{this.props.prop1}    </p> <button onClick={this.props.method}>X</button> <button onClick={this.props.method2}>Done</button>
    
    </div>
  }}
export default App;
