# Online Provider Implementations Archive

Archived on: 2025-01-02 17:29:15

This file contains the archived implementations of various online task providers.

## Table of Contents

### Caldav Provider
- [src/caldav/CalDAVHandler.js](#src-caldav-CalDAVHandler.js)
- [src/caldav/CalDAVTask.js](#src-caldav-CalDAVTask.js)
- [src/caldav/CalDAVTaskList.js](#src-caldav-CalDAVTaskList.js)

### Google Provider
- [src/google/GoogleHandler.js](#src-google-GoogleHandler.js)
- [src/google/GoogleTask.js](#src-google-GoogleTask.js)
- [src/google/GoogleTaskList.js](#src-google-GoogleTaskList.js)

### Microsoft Provider
- [src/microsoft/MicrosoftHandler.js](#src-microsoft-MicrosoftHandler.js)
- [src/microsoft/MicrosoftToDoList.js](#src-microsoft-MicrosoftToDoList.js)
- [src/microsoft/MicrosoftToDoTask.js](#src-microsoft-MicrosoftToDoTask.js)

### Ticktick Provider
- [src/ticktick/TickTickHandler.js](#src-ticktick-TickTickHandler.js)
- [src/ticktick/TickTickTask.js](#src-ticktick-TickTickTask.js)
- [src/ticktick/TickTickTaskList.js](#src-ticktick-TickTickTaskList.js)


## Implementations


### Caldav Provider


================================================================================
## 📄 ZeppOS-Tasks/src/caldav/CalDAVHandler.js
================================================================================

```typescript

import {CalDAVTaskList} from "./CalDAVTaskList";

/**
 * @implements HandlerInterface
 */
export class CalDAVHandler {
  constructor(messageBuilder) {
    this.messageBuilder = messageBuilder;
  }

  getTaskList(id) {
    return new CalDAVTaskList({id}, this);
  }

  getTaskLists() {
    return this.messageBuilder.request({
      package: "caldav_proxy",
      action: "get_task_lists",
    }, {timeout: 5000}).then((d) => {
      if(d.error) throw new Error(d.error);
      return d.map((r) => new CalDAVTaskList(r, this));
    })
  }
}
```



================================================================================
## 📄 ZeppOS-Tasks/src/caldav/CalDAVTask.js
================================================================================

```typescript

import {t} from "../../lib/mmk/i18n";

/**
 * @implements TaskInterface
 */
export class CalDAVTask {
  constructor(data, list, handler) {
    this.id = data.id;

    this.rawData = data.rawData;
    if(data.rawData) {
      this.title = this.rawData.VCALENDAR.VTODO.SUMMARY;
      this.completed = this.rawData.VCALENDAR.VTODO.STATUS === "COMPLETED";
    }

    this.list = list;
    this._handler = handler;
  }

  getCurrentTimeString() {
    const time = hmSensor.createSensor(hmSensor.id.TIME);
    return time.year.toString() +
      time.month.toString().padStart(2, "0") +
      time.day.toString().padStart(2, "0") +
      "T" + time.hour.toString().padStart(2, "0") +
      time.minute.toString().padStart(2, "0") +
      time.second.toString().padStart(2, "0");
  }

  setCompleted(completed) {
    this.completed = completed;
    this.rawData.VCALENDAR.VTODO.STATUS = completed ? "COMPLETED" : "NEEDS-ACTION";

    if(completed) {
      this.rawData.VCALENDAR.VTODO.COMPLETED = this.getCurrentTimeString();
      this.rawData.VCALENDAR.VTODO["PERCENT-COMPLETE"] = "100";
    } else {
      delete this.rawData.VCALENDAR.VTODO.COMPLETED;
      delete this.rawData.VCALENDAR.VTODO["PERCENT-COMPLETE"];
    }

    return this._handler.messageBuilder.request({
      package: "caldav_proxy",
      action: "replace_task",
      id: this.id,
      rawData: this.rawData,
    }, {timeout: 5000})
  }

  setTitle(title) {
    this.title = title;
    this.rawData.VCALENDAR.VTODO.SUMMARY = title;
    return this._handler.messageBuilder.request({
      package: "caldav_proxy",
      action: "replace_task",
      id: this.id,
      rawData: this.rawData,
    }, {timeout: 5000})
  }

  delete() {
    return this._handler.messageBuilder.request({
      package: "caldav_proxy",
      action: "delete_task",
      id: this.id,
    }, {timeout: 5000});
  }

  sync() {
    return this._handler.messageBuilder.request({
      package: "caldav_proxy",
      action: "read_task",
      id: this.id,
    }, {timeout: 5000}).then((data) => {
      this.rawData = data.rawData;
      this.title = this.rawData.VCALENDAR.VTODO.SUMMARY;
      this.completed = this.rawData.VCALENDAR.VTODO.STATUS === "COMPLETED";
    })
  }
}
```



================================================================================
## 📄 ZeppOS-Tasks/src/caldav/CalDAVTaskList.js
================================================================================

```typescript

import {CalDAVTask} from "./CalDAVTask";

/**
 * @implements TaskListInterface
 */
export class CalDAVTaskList {
  constructor(data, handler) {
    this.id = data.id;
    this.title = data.title;

    this._handler = handler;
  }

  getTask(id) {
    return new CalDAVTask({id}, this, this._handler);
  }

  getTasks(withCompleted, pageToken) {
    return this._handler.messageBuilder.request({
      package: "caldav_proxy",
      action: "list_tasks",
      listId: this.id,
      completed: pageToken === "completed",
    }, {timeout: 5000}).then((d) => {
      if(d.error) throw new Error(d.error);
      return {
        tasks: d.map((r) => new CalDAVTask(r, this, this._handler)),
        nextPageToken: (withCompleted && !pageToken) ? "completed" : "",
      };
    })
  }

  insertTask(title) {
    return this._handler.messageBuilder.request({
      package: "caldav_proxy",
      action: "insert_task",
      listId: this.id,
      title
    }, {timeout: 5000}).then((d) => {
      if(d.error) throw new Error(d.error);
      return true;
    })
  }
}
```


### Google Provider


================================================================================
## 📄 ZeppOS-Tasks/src/google/GoogleHandler.js
================================================================================

```typescript

import {clientFetch as fetch} from "../../lib/mmk/FetchForward";
import {reportError, reportRequestFailure} from "../ErrorReportTool";
import {GoogleTaskList} from "./GoogleTaskList";
import {buildQueryURL} from "../Tools";

const BASE_URL = "https://tasks.googleapis.com/tasks/v1";

export class GoogleHandler {
    constructor(token) {
        this.token = token;
    }

    getTaskList(id) {
        return new GoogleTaskList({id, title: ""}, this);
    }

    getTaskLists() {
        return this.request({
            method: "GET",
            url: "/users/@me/lists",
            query: {
                access_token: this.token,
            }
        }).then((data) => {
            return data.items.map((item) => new GoogleTaskList(item, this));
        })
    }

    request(options, noCrash=false) {
        const fetchParams = {
            method: options.method === "GET" ? "GET" : "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-HTTP-Method-Override': options.method
            },
            timeout: 5000,
        }

        // Body
        if(options.body) {
            fetchParams.body = typeof options.body != "string" ?
                JSON.stringify(options.body) : options.body;
        }

        let status = 0;
        return fetch(buildQueryURL(BASE_URL + options.url, options.query), fetchParams).then((res) => {
            status = res.status;
            return status === 204 ? {} : res.json()
        }).then((data) => {
            if((status < 200 || status >= 400) && !noCrash) {
                // noinspection JSCheckFunctionSignatures
                reportRequestFailure(fetchParams, status, data, this.token);
                throw new Error(status + ": " + (data.error ? data.error.message : "Request failed…"));
            }
            return data;
        });
    }
}
```



================================================================================
## 📄 ZeppOS-Tasks/src/google/GoogleTask.js
================================================================================

```typescript

export class GoogleTask {
    constructor(data, parent, handler) {
        this.id = data.id;
        this.title = data.title;
        this.completed = data.status == "completed";
        this.list = parent;

        this._handler = handler;
    }

    sync() {
        return this._handler.request({
            method: "GET",
			url: `/lists/${this.list.id}/tasks/${this.id}`,
			query: {
				access_token: this._handler.token,
			}
        }).then((data) => {
            this.title = data.title;
            this.completed = data.status == "completed";
        })
    }

    setCompleted(value) {
        this.completed = value;
        return this._handler.request({
			method: "PATCH",
			url: `/lists/${this.list.id}/tasks/${this.id}`,
			body: {
				status: value ? "completed" : "needsAction",
				hidden: !!value,
			},
			query: {
				access_token: this._handler.token,
				fields: "status",
			}
        })
    }

    setTitle(title) {
        this.title = title;
        return this._handler.request({
			method: "PATCH",
			url: `/lists/${this.list.id}/tasks/${this.id}`,
			body: {
				title
			},
			query: {
				access_token: this._handler.token,
				fields: "status",
			}
        })
    }

    delete() {
        return this._handler.request({
			method: "DELETE",
			url: `/lists/${this.list.id}/tasks/${this.id}`,
			query: {
				access_token: this._handler.token,
			}
        })
    }
}
```



================================================================================
## 📄 ZeppOS-Tasks/src/google/GoogleTaskList.js
================================================================================

```typescript

import {GoogleTask} from "./GoogleTask";

export class GoogleTaskList {
  constructor(data, handler) {
    this._handler = handler;

    this.id = data.id;
    this.title = data.title;
  }

  insertTask(title) {
    return this._handler.request({
      method: "POST",
      url: `/lists/${this.id}/tasks`,
      body: {
        status: "needsAction",
        title,
      },
      query: {
        access_token: this._handler.token
      },
    });
  }

  getTask(id) {
    return new GoogleTask({id}, this, this._handler);
  }

  getTasks(withCompleted, pageToken) {
    const query = {access_token: this._handler.token};
    if (withCompleted) {
      query.showCompleted = true;
      query.showHidden = true;
    }
    if (typeof pageToken === "string") {
      query.pageToken = pageToken;
    }

    return this._handler.request({
      method: "GET",
      url: `/lists/${this.id}/tasks`,
      query
    }).then((data) => {
      data.items.sort((a, b) => a.position < b.position ? -1 : 1);
      console.log(JSON.stringify(data.items));
      data.items = data.items.map((item) => new GoogleTask(item, this, this._handler))
      console.log(JSON.stringify(data.items));
      return {
        tasks: data.items,
        nextPageToken: data.nextPageToken,
      }
    })
  }
}
```


### Microsoft Provider


================================================================================
## 📄 ZeppOS-Tasks/src/microsoft/MicrosoftHandler.js
================================================================================

```typescript

import {clientFetch as fetch} from "../../lib/mmk/FetchForward";
import {reportRequestFailure} from "../ErrorReportTool";
import {buildQueryURL} from "../Tools";
import {MicrosoftToDoList} from "./MicrosoftToDoList";

const BASE_URL = "https://graph.microsoft.com/v1.0/me/todo";

// noinspection DuplicatedCode
/**
 * @implements HandlerInterface
 */
export class MicrosoftHandler {
  constructor(token) {
    this.token = token;
  }

  getTaskList(id) {
    return new MicrosoftToDoList({id}, this);
  }

  getTaskLists() {
    return this.request({
      method: "GET",
      url: "/lists"
    }).then((data) => {
      return data.value.map((row) => new MicrosoftToDoList(row, this));
    })
  }

  request(options, noCrash=false) {
    const fetchParams = {
      method: options.method === "GET" ? "GET" : "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${this.token}`,
      },
      timeout: 5000,
    }

    // Method
    if(options.method !== "GET" && options.method !== "POST")
      fetchParams.headers["X-HTTP-Method"] = options.method;

    // Body
    if(options.body) {
      fetchParams.body = typeof options.body != "string" ?
        JSON.stringify(options.body) : options.body;
    }

    let status = 0;
    let url = buildQueryURL(BASE_URL + options.url, options.query);
    return fetch(url, fetchParams).then((res) => {
      status = res.status;
      return status === 204 ? {} : res.json()
    }).then((data) => {
      if((status < 200 || status >= 400) && !noCrash) {
        // noinspection JSCheckFunctionSignatures
        reportRequestFailure(fetchParams, status, data, this.token);
        throw new Error(status + ": " + (data.error ? data.error.message : "Request failed…"));
      }
      return data;
    });
  }
}
```



================================================================================
## 📄 ZeppOS-Tasks/src/microsoft/MicrosoftToDoList.js
================================================================================

```typescript

import {MicrosoftToDoTask} from "./MicrosoftToDoTask";

/**
 * @implements TaskListInterface
 */
export class MicrosoftToDoList {
  constructor(data, handler) {
    this.id = data.id;
    this.title = data.displayName;
    this._handler = handler;
  }

  getTask(id) {
    return new MicrosoftToDoTask({id}, this, this._handler);
  }

  getTasks(withCompleted, pageToken) {
    let filter = "";
    if(!withCompleted) {
      filter = "&$filter=" + encodeURIComponent("status ne 'completed'");
    }

    return this._handler.request({
      method: "GET",
      url: `/lists/${this.id}/tasks?${pageToken ? pageToken : `$top=20${filter}`}`
    }).then((data) => {
      let nextPageToken = null;
      if(data["@odata.nextLink"])
        nextPageToken = data["@odata.nextLink"].substring(data["@odata.nextLink"].indexOf("?") + 1);
      return {
        tasks: data.value.map((row) => new MicrosoftToDoTask(row, this, this._handler)),
        nextPageToken,
      };
    })
  }

  insertTask(title) {
    return this._handler.request({
      method: "POST",
      url: `/lists/${this.id}/tasks`,
      body: {
        title
      }
    });
  }
}
```



================================================================================
## 📄 ZeppOS-Tasks/src/microsoft/MicrosoftToDoTask.js
================================================================================

```typescript

/**
 * @implements TaskInterface
 */
export class MicrosoftToDoTask {
  constructor(data, parent, handler) {
    this.id = data.id;
    this.title = data.title;
    this.completed = data.status === "completed";

    this.list = parent;
    this._handler = handler;
  }

  sync() {
    return this._handler.request({
      method: "GET",
      url: `/lists/${this.list.id}/tasks/${this.id}`,
    }).then((data) => {
      this.title = data.title;
      this.completed = data.status === "completed";
    });
  }

  delete() {
    return this._handler.request({
      method: "DELETE",
      url: `/lists/${this.list.id}/tasks/${this.id}`
    });
  }

  setCompleted(completed) {
    return this._handler.request({
      method: "PATCH",
      url: `/lists/${this.list.id}/tasks/${this.id}`,
      body: {
        status: completed ? "completed": "notStarted",
      }
    });
  }

  setTitle(title) {
    return this._handler.request({
      method: "PATCH",
      url: `/lists/${this.list.id}/tasks/${this.id}`,
      body: {
        title
      }
    });
  }
}
```


### Ticktick Provider


================================================================================
## 📄 ZeppOS-Tasks/src/ticktick/TickTickHandler.js
================================================================================

```typescript

import {clientFetch as fetch} from "../../lib/mmk/FetchForward";
import {reportRequestFailure} from "../ErrorReportTool";
import {TickTickTaskList} from "./TickTickTaskList";
import {buildQueryURL} from "../Tools";

const BASE_URL = "https://ticktick.com/open/v1";

export class TickTickHandler {
    constructor(token) {
        this.token = token;
        this.cantListCompleted = true; // tick tick api is freaking trash
    }

    getTaskList(id) {
        return new TickTickTaskList({id, title: ""}, this);
    }

    getTaskLists() {
        return this.request({
            method: "GET",
            url: "/project"
        }).then((data) => {
            return data.map((item) => new TickTickTaskList(item, this));
        })
    }

    request(options, noCrash=false) {
        const fetchParams = {
            method: options.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
            timeout: 5000,
        }

        // Body
        if(options.body) {
            fetchParams.body = typeof options.body != "string" ?
                JSON.stringify(options.body) : options.body;
        }

        let status = 0;
        return fetch(buildQueryURL(BASE_URL + options.url, options.query), fetchParams).then((res) => {
            status = res.status;
            return status === 204 ? {} : res.json()
        }).then((data) => {
            if((status < 200 || status >= 400) && !noCrash) {
                // noinspection JSCheckFunctionSignatures
                reportRequestFailure(fetchParams, status, data, this.token);
                throw new Error(status + ": " + (data.error ? data.error.message : "Request failed…"));
            }
            return data;
        });
    }
}
```



================================================================================
## 📄 ZeppOS-Tasks/src/ticktick/TickTickTask.js
================================================================================

```typescript

export class TickTickTask {
    constructor(data, parent, handler) {
        this.id = data.id;
        this.title = data.title;
        this.completed = data.status === 1;
        this.list = parent;

        this._handler = handler;
    }

    sync() {
        return this._handler.request({
            method: "GET",
			url: `/project/${this.list.id}/task/${this.id}`,
			query: {
				access_token: this._handler.token,
			}
        }).then((data) => {
            this.title = data.title;
            this.completed = data.status === 0;
        })
    }

    setCompleted(value) {
        if(value !== true) {
            throw new Error("TickTick API can't un-complete task.");
        }

        this.completed = value;
        return this._handler.request({
			method: "POST",
			url: `/project/${this.list.id}/task/${this.id}/complete`,
            body: '',
        })
    }

    setTitle(title) {
        this.title = title;
        return this._handler.request({
			method: "POST",
			url: `/task/${this.id}`,
			body: {
                taskId: this.id,
                projectId: this.list.id,
				title
			},
			query: {
				access_token: this._handler.token,
				fields: "status",
			}
        })
    }

    delete() {
        return this._handler.request({
			method: "DELETE",
			url: `/project/${this.list.id}/task/${this.id}`,
        })
    }
}
```



================================================================================
## 📄 ZeppOS-Tasks/src/ticktick/TickTickTaskList.js
================================================================================

```typescript

import {TickTickTask} from "./TickTickTask";

export class TickTickTaskList {
  constructor(data, handler) {
    this._handler = handler;

    this.id = data.id;
    this.title = data.name;
  }

  insertTask(title) {
    return this._handler.request({
      method: "POST",
      url: `/task`,
      body: {
        title,
        projectId: this.id,
      },
    });
  }

  getTask(id) {
    return new TickTickTask({id}, this, this._handler);
  }

  getTasks() {
    return this._handler.request({
      method: "GET",
      url: `/project/${this.id}/data`,
    }).then((data) => {
      const tasks = data.tasks
          .sort((a, b) => a.sortOrder < b.sortOrder ? -1 : 1)
          .map((item) => new TickTickTask(item, this, this._handler));

      return {
        tasks: tasks,
        nextPageToken: data.nextPageToken,
      }
    })
  }
}
```
