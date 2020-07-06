export interface ICacheService {
    getValue(key: string): Promise<any>;
    setValue(key: string, val: any, ttl?: number): Promise<void>;
    isConnected(): boolean;
}
