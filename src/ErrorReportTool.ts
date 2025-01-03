interface FetchParams {
    method: string;
    url: string;
    headers: { [key: string]: string };
}

interface ErrorData {
    error?: any;
}

export function reportError(e: any): void {
    console.log(e);
}

export function reportRequestFailure(
    fetchParams: FetchParams, 
    status: number, 
    data: ErrorData, 
    token: string
): void {
    let report = `Failed to fetch: ${fetchParams.method} ${fetchParams.url}`;
    report += `\nHeaders: ${JSON.stringify(fetchParams.headers)}`;
    report += `\nStatus code: ${status}`;

    if(data.error) report += `\nGoogle API errors: ${JSON.stringify(data.error)}`;
    report = report.replaceAll(token, "ACCESS_TOKEN");
    return reportError(report);
} 