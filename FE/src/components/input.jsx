

function Input(
    {
        onChange,
        onSubmit,
        value,
        placeholder = "Nhập thông tin",
        className = "",
        ...props
    }
) {

    return (
        <div>
            <input
                onChange={onChange}
                type="text"
                placeholder="Nhập thông tin" />
        </div>
    )
}


export default memo(Input);