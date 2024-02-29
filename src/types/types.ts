interface PhotoLinks {
    download: string;
    download_location: string;
    html: string;
    self: string;
}

interface UserProfileImage {
    large: string;
    medium: string;
    small: string;
}

interface SocialLinks {
    instagram_username: string;
    paypal_email: string | null;
    portfolio_url: string;
    twitter_username: string;
}

interface User {
    accepted_tos: boolean;
    bio: string;
    first_name: string;
    for_hire: boolean;
    id: string;
    instagram_username: string;
    last_name: string | null;
    links: {
        followers: string;
        following: string;
        html: string;
        likes: string;
        photos: string;
        portfolio: string;
        self: string;
    };
    location: string;
    name: string;
    portfolio_url: string;
    profile_image: UserProfileImage;
    social: SocialLinks;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    total_promoted_photos: number;
    twitter_username: string;
    updated_at: string;
    username: string;
}

interface Location {
    name: string;
    city: string;
    country: string;
    position: {
        latitude: number;
        longitude: number;
    };
}

export interface UnsplashPhoto {
    alt_description: string;
    blur_hash: string;
    breadcrumbs: any[]; 
    color: string;
    created_at: string;
    current_user_collections: any[]; 
    description: string;
    height: number;
    id: string;
    liked_by_user: boolean;
    likes: number;
    links: PhotoLinks;
    promoted_at: string | null;
    slug: string;
    sponsorship: any; 
    tagline: string;
    tagline_url: string;
    topic_submissions: any; 
    updated_at: string;
    urls: {
        full: string;
        raw: string;
        regular: string;
        small: string;
        small_s3: string;
        thumb: string;
    };
    user: User;
    width: number;
    location: Location;
}
