export interface SubscriptionInfo {
    subscriptionInfoId: number;
    discount: number;
    subscriptionType: SubscriptionType;
    duration: DurationSubscription;
}

export interface SubscriptionType {
    subscriptionTypeId: number;
    name: string;
    price: number;
}

export interface DurationSubscription {
    durationId: number;
    time: number;
}
