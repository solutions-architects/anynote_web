import "./button.scss"
import LoadingCircle from "../LoadingCircle/LoadingCircle"

interface Props {
    children: React.ReactNode,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    type?: "primary" | "secondary",
    className?: string,
    disabled?: boolean,
    loading?: boolean,
}

function Button({ children, onClick, className = "", type = "primary", disabled = false, loading = false }: Props) {
    return (
        <button
        className={`button button--${type} ${className}`}
        onClick={onClick}
        disabled={disabled}
        >
            { loading ? <LoadingCircle sizePx={23}/> : children }
        </button>
    )
}

export default Button
