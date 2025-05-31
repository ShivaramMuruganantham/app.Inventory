
function input(props) {

    const handleChange = (e) => {
        if (props.onChange){
            props.onChange(e);
        }
    }

    return (
        <div>
            <label>{props.label}</label>
            <input type={props.type} name={props.name} placeholder={props.placeholder} className={props.className} onChange={props.onChange}/>
        </div>
    )
}

export default input