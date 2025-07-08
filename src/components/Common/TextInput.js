import "../../style/css/TextInput.css";


const TextInput  = ({value, onChange, placeholder,onKeyDown, size = "medium", searchIcon: SearchIcon, icon: Icon, closeIcon:CloseIcon, onClose, onClick,style = {},}) => {
    const sizeClass = {
        small: "input-small",
        medium: "input-medium",
        large: "input-large"
    };
    

    const isFilled = value.length > 0;

    return (
        <div className={`input-wrapper ${sizeClass[size]} ${isFilled ? "filled" : ""}`} style={style}>
            {SearchIcon && <SearchIcon className="search-icon" />}
                <input type="text" className="text-input" placeholder={placeholder} value={value} onChange={onChange}  onKeyDown={onKeyDown} />
            {CloseIcon && <CloseIcon className="close-icon" onClick={onClose} />}
            {Icon && <Icon className="send-icon" onClick={onClick} />}
        </div>
    );
};

export default TextInput ;