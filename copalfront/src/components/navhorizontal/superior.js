import 'bootstrap/dist/css/bootstrap.min.css';  

const Sup=(propts)=>{
    let items ={propts}; 
    items.push(<div className="sup" >{propts[0]}</div>);
    return(
        <div className='sup'>{items}</div>
    );
};
export default Sup;