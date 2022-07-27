import {MissionPriority} from "./Enums";

export function translatePriorityToColor(priority: MissionPriority | undefined = 0) {
    switch (priority) {
        case MissionPriority.Lowest:
            return 'default';
        case MissionPriority.Low:
            return 'info';
        case MissionPriority.Normal:
            return 'primary';
        case MissionPriority.High:
            return 'secondary';
        case MissionPriority.Highest:
            return 'warning';
        case MissionPriority.Urgent:
            return 'error';
    }
}