export enum MissionStatus {
    Waiting,
    InProgress,
    Blocked,
    Done
}

export enum MissionPriority {
    Lowest = 1,
    Low,
    Normal,
    High,
    Highest,
    Urgent
}

export enum MissionUpdateOperation {
    Add,
    Update,
    Delete
}