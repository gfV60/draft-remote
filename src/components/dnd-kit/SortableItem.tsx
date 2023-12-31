import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import Item from "./Item"
import {HTMLAttributes} from "react"
import {Player} from "../../scripts/draft";
import {Arguments} from "@dnd-kit/sortable/dist/hooks/useSortable";

type Props = {
    item: Player
} & HTMLAttributes<HTMLDivElement>

const SortableItem = ({ item, ...props }: Props) => {
    const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
        id: item.id,
    } as Arguments)

    const styles = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined,
    }

    return (
        <Item
            item={item}
            ref={setNodeRef}
            style={styles}
            isOpacityEnabled={isDragging}
            {...props}
            {...attributes}
            {...listeners}
        />
    )
}

export default SortableItem
