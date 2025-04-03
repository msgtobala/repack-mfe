
    export type RemoteKeys = 'REMOTE_ALIAS_IDENTIFIER/UpcomingAppointments';
    type PackageType<T> = T extends 'REMOTE_ALIAS_IDENTIFIER/UpcomingAppointments' ? typeof import('REMOTE_ALIAS_IDENTIFIER/UpcomingAppointments') :any;