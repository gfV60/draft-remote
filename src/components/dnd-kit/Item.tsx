import { CSSProperties, forwardRef, HTMLAttributes } from "react"
import {Player} from "../../scripts/draft";
import {Typography} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

type Props = {
    item: Player
    isOpacityEnabled?: boolean
    isDragging?: boolean
} & HTMLAttributes<HTMLDivElement>

const Item = forwardRef<HTMLDivElement, Props>(
    ({ item, isOpacityEnabled, isDragging, style, ...props }, ref) => {
        const styles: CSSProperties = {
            opacity: isOpacityEnabled ? "0.4" : "1",
            cursor: isDragging ? "grabbing" : "grab",
            lineHeight: "0.5",
            transform: isDragging ? "scale(1.05)" : "scale(1)",
            border: "1px solid black",
            ...style
        }

        return (
            <div ref={ref} style={styles} {...props}>
                <Typography fontSize={"20px"}><DragIndicatorIcon style={{"vertical-align": "sub"}}/>{item.name}</Typography>
            </div>
        )
    }
)

export default Item
