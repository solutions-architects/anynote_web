import "./note.scss"
import useContextMenu from "../../services/hooks/useContextMenu.ts";
import ContextMenu from "../../ui/components/ContextMenu/ContextMenu.tsx";
import MenuButton from "../../ui/components/ContextMenuButton/MenuButton.tsx";
function Note() {
    const {clicked, setClicked, points, setPoints} = useContextMenu()
    const handleButtonClick = () => {

    }
    return (
        <div className="note"
        onContextMenu={(e) => {
            e.preventDefault()
            setClicked(true)
            setPoints({
                x: e.pageX,
                y: e.pageY,
            })
        }}>
            Note page

            {clicked && (
                <ContextMenu top={points.y} left={points.x}>
                    <MenuButton onClick={handleButtonClick} iconLeft="settings" iconRight="arrowRight">
                        Option 1</MenuButton>
                    <MenuButton onClick={handleButtonClick}>Option 2</MenuButton>
                    <MenuButton onClick={handleButtonClick}>Option 3</MenuButton>
                </ContextMenu>
            )}
        </div>
    )
}

export default Note
