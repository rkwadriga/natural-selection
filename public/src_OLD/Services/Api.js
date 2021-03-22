class Api {
    constructor(config, beforeRequestHandler, successHandler, errorHandler) {
        this.baseUrl = config.baseUrl;
        this.beforeRequestHandler = beforeRequestHandler;
        this.successHandler = successHandler;
        this.errorHandler = errorHandler;
    }

    put(path, data, headers = {}) {
        return this.request(path, data, headers, 'PUT');
    }

    async request(path, data, headers, method = 'GET') {
        const url = this.baseUrl + path;
        this.prepareHeaders(headers);

        this.beforeRequestHandler({
            method,
            url,
            data,
            headers
        });

        const result = {
            status: null,
            data: null,
            error: null,
            errorContext: null,
            isValid: true
        };

        const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(data)
        }).catch(error => {
            result.isValid = false;
            result.error = error;
        });

        this.handleResponse(response, result);
        return result;
    }

    async handleResponse(response, result) {
        let body = null;
        if (response !== undefined) {
            result.status = response.status;
            body = await response.json();
        }

        if (result.status === 200) {
            result.data = body;
        } else {
            result.isValid = false;
            if (body !== null) {
                if (body.error !== undefined) {
                    result.error = body.error.message;
                    result.errorContext = body.error.context;
                } else {
                    result.error = body;
                }
            }
        }

        if (result.isValid) {
            this.handleSuccessResult(result);
        } else {
            this.handleErrorResult(result);
        }
    }

    handleSuccessResult(result) {
        this.successHandler(result);
    }

    handleErrorResult(result) {
        this.errorHandler(result);
    }

    prepareHeaders(headers) {
        if (headers['Content-Type'] === undefined) {
            headers['Content-Type'] = 'application/json';
        }
    }
}
export default Api;