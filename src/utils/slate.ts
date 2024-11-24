import { BaseEditor, Descendant } from "slate"
import { ReactEditor } from "slate-react"

// According to slate docs given code is required to make lib work correctly with react
type CustomElement = { type: "paragraph"; children: CustomText[] }
type CustomText = { text: string }

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}
