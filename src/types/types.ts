interface UserLinks {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
    following: string;
    followers: string;
}

interface UserProfileImage {
    small: string;
    medium: string;
    large: string;
}

interface User {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username: string;
    portfolio_url: string;
    bio: string;
    location: string;
    links: UserLinks;
    profile_image: UserProfileImage;
    total_collections: number;
    instagram_username: string;
    total_likes: number;
    total_photos: number;
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

interface ExifData {
    make: string;
    model: string;
    exposure_time: string;
    aperture: string;
    focal_length: string;
    iso: number;
}

export interface UnsplashPhoto {
    id: string;
    created_at: string;
    updated_at: string;
    width: number;
    height: number;
    color: string;
    likes: number;
    user: User;
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
    };
    links: {
        self: string;
        html: string;
        download: string;
        download_location: string;
    };
    location: Location;
    exif: ExifData;
    views: number;
    downloads: number;
}

