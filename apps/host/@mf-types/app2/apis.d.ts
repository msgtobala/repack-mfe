
    export type RemoteKeys = 'app2/UpcomingAppointments';
    type PackageType<T> = T extends 'app2/UpcomingAppointments' ? typeof import('app2/UpcomingAppointments') :any;