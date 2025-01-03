interface QueryParams {
    [key: string]: string | number | boolean;
}

export function buildQueryURL(url: string, params?: QueryParams): string {
    if(params) {
        url += "?";
        for(const key in params) {
            url += key + "=" + encodeURIComponent(params[key].toString()) + "&";
        }
        url = url.substring(0, url.length - 1);
    }
    return url;
} 