import "./loading-circle.scss"


export default function LoadingCircle({ sizePx }: { sizePx: number }) {
    return (
        <div className="container">
            <svg 
            className="spinner" 
            width={`${sizePx}px`} 
            height={`${sizePx}px`}
            viewBox="0 0 66 66" 
            xmlns="http://www.w3.org/2000/svg"
            >
                <circle 
                className="path" 
                fill="none" 
                strokeWidth="6" 
                strokeLinecap="round" 
                cx="33" 
                cy="33" 
                r="30"
                />
            </svg>
        </div>
    )
}