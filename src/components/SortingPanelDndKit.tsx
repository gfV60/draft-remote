import { useState } from "react"
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
    TouchSensor,
    closestCenter
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy
} from "@dnd-kit/sortable"
import Item from "./dnd-kit/Item"
import SortableItem from "./dnd-kit/SortableItem"
import {Player} from "../scripts/draft";

interface SortingPanelDndKitProps {
    players: Player[];
    setPlayers: (players: (prev: any) => any) => void;
}

export default function SortingPanelDndKit(props: SortingPanelDndKitProps) {
    const {players, setPlayers} = props;

    // for drag overlay
    const [activeItem, setActiveItem] = useState<Player>()

    // for input methods detection
    const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor))

    // triggered when dragging starts
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event
        setActiveItem(players.find((item) => item.id === active.id))
    }

    // triggered when dragging ends
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over) return

        const activeItem = players.find((item) => item.id === active.id)
        const overItem = players.find((item) => item.id === over.id)

        if (!activeItem || !overItem) {
            return
        }

        const activeIndex = players.findIndex((item) => item.id === active.id)
        const overIndex = players.findIndex((item) => item.id === over.id)

        if (activeIndex !== overIndex) {
            setPlayers((prev) => arrayMove<Player>(prev, activeIndex, overIndex))
        }
        setActiveItem(undefined)
    }

    const handleDragCancel = () => {
        setActiveItem(undefined)
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <SortableContext items={players} strategy={rectSortingStrategy}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(1, 1fr)`,
                        gridGap: 16,
                        maxWidth: "800px",
                        margin: "16px auto 48px"
                    }}
                >
                    {players.map((item) => (
                        <SortableItem key={item.id} item={item} />
                    ))}
                </div>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
                {activeItem ? <Item item={activeItem} isDragging /> : null}
            </DragOverlay>
        </DndContext>
    )

}
