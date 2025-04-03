
    export type RemoteKeys = 'app1/MemberCard';
    type PackageType<T> = T extends 'app1/MemberCard' ? typeof import('app1/MemberCard') :any;