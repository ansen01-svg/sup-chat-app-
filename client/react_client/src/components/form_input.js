let FormInput = (props) => {

    let { divClass, inputClass, type, placeholder, name, value, handleChange } = props

    return (
        <div className={divClass}>
            <input type={type} className={inputClass} placeholder={placeholder}
            name={name} value={value} onChange={handleChange} />
        </div>
    )
}


export default FormInput