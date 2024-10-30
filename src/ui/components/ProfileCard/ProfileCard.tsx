import "./profile-card.scss";
import Button from "../Button/Button.tsx"

interface ProfileCardProps {
    cardTitle: string,
    buttonTitle: string,
    data: string,
    isUnderlined: boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    className?: string,
}

function ProfileCard({cardTitle, buttonTitle, data, isUnderlined, onClick, className}: ProfileCardProps) {
    return (
        <div className={`profile-card ${isUnderlined ? "profile-card--underline" : ""} ${className}`}>
            <div className="card__title">{cardTitle}</div>

            <div className="profile-card__body">
                <div className="profile-card__body-data">{data}</div>
                <Button onClick={onClick} className="profile-card__body-button-width">{buttonTitle}</Button>
            </div>

        </div>
    )
}

export default ProfileCard;