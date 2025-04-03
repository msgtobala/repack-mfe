
    export type RemoteKeys = 'REMOTE_ALIAS_IDENTIFIER/MemberCard';
    type PackageType<T> = T extends 'REMOTE_ALIAS_IDENTIFIER/MemberCard' ? typeof import('REMOTE_ALIAS_IDENTIFIER/MemberCard') :any;