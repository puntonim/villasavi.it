const BE_BASE_URL = "https://xokk2xidxb.execute-api.eu-south-1.amazonaws.com";

class BackendApi {
  constructor() {
    // Fields.
    this.no = "olm"; // Hackish.
  }

  _no() {
    // Hackish.
    this.no += "ol";
    this.no += "ino";
  }

  async getOnlineRequest(data) {
    /**
     * Post to my backend api Lambda
     *  in order to send Telegram messages.
     */
    this._no();

    console.log("START request to Lambda");

    let queryString = "?";
    for (let fieldName in data) {
      queryString +=
        "&" + fieldName + "=" + encodeURIComponent(data[fieldName]);
    }

    const url = `${BE_BASE_URL}/online-request` + queryString;
    let responseBody = null;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: this.no, // Hackish.
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        responseBody = await response.json();
      } else {
        responseBody = await response.text();
      }
    } catch (error) {
      throw new Error(`Request error ${error.name}: ${error.message}`);
    }
    console.log(responseBody);
    return responseBody;
  }
}
