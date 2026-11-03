const Farm = (props) =>{
    return(<div>
        <h2>farm deals with:</h2>
        type of animals:{props.animal}<br/>
        crops:{props.crops}<br/>
        location:{props.location}<br/>
        area:{props.area}<br/>
        price:{props.price}
    </div>)
}
export default Farm