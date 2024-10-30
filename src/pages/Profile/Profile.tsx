import "./profile.scss"
import ProfileCard from "../../ui/components/ProfileCard/ProfileCard.tsx";
import Dialogue from "../../ui/components/DialogueWindow/Dialogue.tsx";
import { useSelector, useDispatch } from "react-redux";
import ControlledInput from "../../ui/components/TextInput/ControlledInput.tsx";
import { AppDispatch, RootState } from "../../services/state/store.ts";
import {useState} from "react";
import {openModal} from "../../services/state/slices/modalSlice.ts";
export default function Profile() {
    const modals = {
        name: "name",
        email: "email",
        password: "password",
    }
    const dispatch = useDispatch<AppDispatch>()
    const [newName, setNewName] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const fakeData = {
        name: "Steve Rambo",
        email: "steveRambo@gmail.com",
    }
    const handleConfirm = () => {
        // what to do if user presses confirm in dialogue window
    }
    const handleContact = () => {
        // contact us logic
    }
    const handleLogOut = () => {
        // logout logic
    }
    const openChangeNameModal = (modalId: string) => {
        dispatch(openModal(modalId))
    }
    return (
        <>

            <Dialogue title="Change your name" onConfirm={handleConfirm} modalId={modals.name}>
                <ControlledInput onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)
                } label="New name" value={newName} />
            </Dialogue>


            <Dialogue title="Change your email" onConfirm={handleConfirm} modalId={modals.email}>
                <ControlledInput onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => setNewEmail(e.target.value)
                } label="New email" value={newEmail} />
            </Dialogue>


            <Dialogue title="Change your password" onConfirm={handleConfirm} modalId={modals.password}>
                <ControlledInput onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)
                } label="Current password" value={currentPassword} type="password"/>

                <div className="profile__card-margin"></div>

                <ControlledInput onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)
                } label="New password" value={newPassword} type="password"/>
            </Dialogue>


            <div className="profile">
                <div className="profile__container">
                    <div className="profile__container-title">Your profile</div>

                    <ProfileCard cardTitle="Name" className="profile__card-margin"
                                 buttonTitle="Change" data={fakeData.name}
                                 isUnderlined={true} onClick={() => openChangeNameModal(modals.name)} />

                    <ProfileCard cardTitle="Email" buttonTitle="Change" data={fakeData.email}
                                 isUnderlined={true} onClick={() => openChangeNameModal(modals.email)}
                                 className="profile__card-margin" />

                    <ProfileCard cardTitle="Password" buttonTitle="Change" data="Change your password"
                                 isUnderlined={true} onClick={() => openChangeNameModal(modals.password)}
                                 className="profile__card-margin" />

                    <ProfileCard cardTitle="Contact support" buttonTitle="Email us"
                                 data="Reach us if you have any problems with our app"
                                 isUnderlined={true} onClick={handleContact}
                                 className="profile__card-margin" />

                    <ProfileCard cardTitle="Log out" buttonTitle="Log out"
                                 data="Log out from our app"
                                 isUnderlined={false} onClick={handleLogOut}
                                 className="profile__card-margin" />
                </div>
            </div>

        </>
    )
}
